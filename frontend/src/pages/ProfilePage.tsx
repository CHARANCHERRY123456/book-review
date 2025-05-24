import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '../components/ui/Tabs';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ReviewList from '../components/reviews/ReviewList';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import { reviewService } from '../services/reviewService';
import { UserProfile } from '../types/User';
import { Review } from '../types/Review';
import { logger } from '../logger';
import { MESSAGES } from '../constants/messages';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await userService.getUserProfile();
        setProfile(profileData);
        
        // Initialize form with profile data
        setName(profileData.name);
        setBio(profileData.bio || '');
        setFavoriteGenres(profileData.favoriteGenres || []);
        
        logger.info('User profile loaded');
      } catch (error) {
        logger.error('Failed to load user profile', { error });
      } finally {
        setLoading(false);
      }
    };

    const fetchUserReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await reviewService.getUserReviews();
        setUserReviews(response.data);
        logger.info('User reviews loaded');
      } catch (error) {
        logger.error('Failed to load user reviews', { error });
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchProfile();
    fetchUserReviews();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setUpdating(true);
      
      const updatedProfile = await userService.updateUserProfile({
        name,
        bio,
        favoriteGenres,
      });
      
      setProfile(updatedProfile);
      setSuccess(MESSAGES.PROFILE_UPDATE_SUCCESS);
      logger.info('Profile updated successfully');
    } catch (err) {
      logger.error('Failed to update profile', { error: err });
      setError('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-8 w-1/3 rounded mb-6"></div>
        <div className="bg-gray-200 h-64 w-full rounded"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <Tabs>
        <TabList>
          <Tab>Profile Information</Tab>
          <Tab>Your Reviews</Tab>
        </TabList>
        
        <TabPanel>
          <Card className="mt-6">
            <CardBody>
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <Input
                    label="Full Name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md w-full cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Email cannot be changed
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    placeholder="Tell us about yourself and your reading preferences"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Favorite Genres
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance', 'Science Fiction', 'Fantasy', 'Biography'].map((genre) => (
                      <label
                        key={genre}
                        className={`
                          px-3 py-2 rounded-md cursor-pointer text-sm transition-colors
                          ${favoriteGenres.includes(genre.toLowerCase()) 
                            ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}
                        `}
                      >
                        <input
                          type="checkbox"
                          value={genre.toLowerCase()}
                          checked={favoriteGenres.includes(genre.toLowerCase())}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFavoriteGenres([...favoriteGenres, e.target.value]);
                            } else {
                              setFavoriteGenres(favoriteGenres.filter((g) => g !== e.target.value));
                            }
                          }}
                          className="sr-only"
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    isLoading={updating} 
                    disabled={updating}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </TabPanel>
        
        <TabPanel>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Reviews ({profile.reviewCount})</h2>
            <ReviewList reviews={userReviews} loading={reviewsLoading} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProfilePage;