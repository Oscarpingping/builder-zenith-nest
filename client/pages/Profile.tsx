import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Share,
  Edit,
  CheckCircle,
  Star,
  MessageSquare,
  MapPin
} from "lucide-react";
import { maddieWeiProfile } from "@/data/demoProfiles";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import BottomNavigation from "../components/BottomNavigation";

export default function Profile() {
  const { user } = useAuth();
  const [following, setFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'completed' | 'organized'>('completed');
  const activitiesRef = useRef<HTMLDivElement>(null);

  // Use the profile hook to get real data when user is logged in
  const { profile, followStats, loading } = useProfile(user?.id);

  // Use demo profile when not signed in or loading
  const displayProfile = (user && profile) ? {
    ...profile,
    followers: followStats.followers,
    following: followStats.following,
    rating: profile.average_rating || 0,
    reviews: profile.total_reviews || 0
  } : {
    ...maddieWeiProfile,
    full_name: "Maddie Wei",
    profile_image: "https://cdn.builder.io/api/v1/image/assets%2Ff84d5d174b6b486a8c8b5017bb90c068%2Fb4460a1279a84ad1b10626393196b1cf?format=webp&width=800",
    followers: 152,
    following: 87,
    rating: 4.8,
    reviews: 23
  };
  const isDemo = !user;

  const handleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div className="react-native-container bg-white font-cabin relative native-scroll">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <Link to="/explore">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <span className="text-gray-500 font-medium">Profile</span>
        <Link to="/chat">
          <MessageSquare className="w-6 h-6 text-explore-green" />
        </Link>
      </div>

      {/* Profile Content */}
      <div className="bg-white">
        {/* Profile Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-gray-200">
              <img
                src={displayProfile.profile_image}
                alt={displayProfile.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-black mb-2">{displayProfile.full_name}</h1>
              
              {/* Stats */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                {loading ? (
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <span>•</span>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowFollowers(true)}
                      className="hover:text-explore-green transition-colors"
                    >
                      {displayProfile.followers || 0} Followers
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => setShowFollowing(true)}
                      className="hover:text-explore-green transition-colors"
                    >
                      {displayProfile.following || 0} Following
                    </button>
                  </>
                )}
              </div>

              {/* Rating */}
              <button
                onClick={() => activitiesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 mb-3 hover:opacity-75 transition-opacity"
              >
                {loading ? (
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                ) : displayProfile.rating && displayProfile.rating > 0 ? (
                  <>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(displayProfile.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-black">
                      {displayProfile.rating.toFixed(1)} ({displayProfile.reviews || 0} reviews)
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">No reviews yet</span>
                )}
              </button>
            </div>
          </div>

          {/* Activity Tags */}
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-explore-green text-white rounded-full text-sm font-medium">
              Climbing • Expert
            </span>
            <span className="px-3 py-1 border border-orange-300 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
              Coach • Certified
            </span>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-6 leading-relaxed text-sm">
            Weekend warrior and outdoor enthusiast. Love helping people reach new heights! Always looking to share knowledge and create a safe, fun climbing environment.
          </p>
        </div>

        {/* Personal Details Section */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-bold text-black mb-4">Personal Details</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Gender:</span>
              <div className="font-medium text-black">Female</div>
            </div>
            <div>
              <span className="text-gray-600">Age:</span>
              <div className="font-medium text-black">28 years old</div>
            </div>
            <div>
              <span className="text-gray-600">Nationality:</span>
              <div className="font-medium text-black">British</div>
            </div>
            <div>
              <span className="text-gray-600">Experience:</span>
              <div className="font-medium text-black">5 years</div>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Institution:</span>
              <div className="font-medium text-black">London School of Economics</div>
            </div>
          </div>
        </div>

        {/* Activities & Reviews Section */}
        <div ref={activitiesRef} className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-black">Activities & Reviews</h3>
            <span className="text-sm text-gray-500">15 total</span>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-white text-explore-green shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed Activities
            </button>
            <button
              onClick={() => setActiveTab('organized')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'organized'
                  ? 'bg-white text-explore-green shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Organized Activities
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-3">
            {activeTab === 'completed' ? (
              <>
                {/* Completed Activities with Reviews */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">🧗</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">Westway Women's+ Climbing Morning</h4>
                      <p className="text-sm text-gray-600">Coach Holly Peristiani • Feb 5, 2025</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">Your review: "Amazing session!"</span>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">🚴</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">Sunday Morning Social Ride</h4>
                      <p className="text-sm text-gray-600">Richmond Cycling Club • Feb 2, 2025</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="w-3 h-3 text-gray-300" />
                        <span className="text-xs text-gray-500 ml-1">Your review: "Great route, friendly group"</span>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">🏃</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">Richmond Park Morning Run</h4>
                      <p className="text-sm text-gray-600">Run Club London • Jan 28, 2025</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">Your review: "Perfect pace for beginners"</span>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Organized Activities */}
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-explore-green">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">🧗</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">Beginner Climbing Workshop</h4>
                      <p className="text-sm text-gray-600">You organized • Jan 20, 2025</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">4.9 avg rating (8 reviews)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">"Great instruction, very patient!" - Sarah</p>
                    </div>
                    <div className="text-xs text-gray-500">8 joined</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-explore-green">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">🚴</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">Women's Cycling Safety Workshop</h4>
                      <p className="text-sm text-gray-600">You organized • Jan 15, 2025</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">4.8 avg rating (12 reviews)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">"Learned so much about road safety!" - Emma</p>
                    </div>
                    <div className="text-xs text-gray-500">12 joined</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-explore-green">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">🧗</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">Advanced Lead Climbing Session</h4>
                      <p className="text-sm text-gray-600">You organized • Jan 10, 2025</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star className="w-3 h-3 text-gray-300" />
                        </div>
                        <span className="text-xs text-gray-600">4.7 avg rating (5 reviews)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">"Challenging but excellent guidance" - Marcus</p>
                    </div>
                    <div className="text-xs text-gray-500">5 joined</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Gear & Skills Section */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-bold text-black mb-4">Gear & Skills</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span>���</span>
              <span className="text-sm">Rope</span>
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span>⛑️</span>
              <span className="text-sm">Helmet</span>
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span>🦺</span>
              <span className="text-sm">Harness</span>
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span>🚴</span>
              <span className="text-sm">Road Bike</span>
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
            </div>
          </div>
        </div>

        {/* Clubs Section */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-bold text-black mb-4">Clubs</h3>
          
          <div className="space-y-3">
            <Link to="/club/westway" className="block">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop"
                  alt="Westway Climbing"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-black">Westway Climbing Centre</h4>
                  <p className="text-sm text-gray-600">245 members</p>
                </div>
              </div>
            </Link>

            <Link to="/club/richmond-runners" className="block">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff84d5d174b6b486a8c8b5017bb90c068%2F7c405a1be5e04dc69eb62c5c70ba6efc?format=webp&width=800"
                  alt="Richmond Cycling Club"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-black">Richmond Cycling Club</h4>
                  <p className="text-sm text-gray-600">182 members</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Location Section */}
        <div className="px-6 pb-8">
          <h3 className="text-lg font-bold text-black mb-4">Location</h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="text-sm">London, UK</span>
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <button onClick={() => setShowFollowers(false)}>
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-gray-500 font-medium">Followers</span>
            <div className="w-6"></div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {/* Demo followers */}
              {[
                { name: "Alice Johnson", university: "Oxford University", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop" },
                { name: "Sarah Chen", university: "LSE", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" },
                { name: "Emma Wilson", university: "UCL", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop" }
              ].map((follower, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={follower.image} alt={follower.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <h4 className="font-medium text-black">{follower.name}</h4>
                    <p className="text-sm text-gray-600">{follower.university}</p>
                  </div>
                  <button className="px-4 py-2 bg-explore-green text-white rounded-lg text-sm">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <button onClick={() => setShowFollowing(false)}>
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-gray-500 font-medium">Following</span>
            <div className="w-6"></div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {/* Demo following */}
              {[
                { name: "Coach Holly", university: "Westway Climbing", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=40&h=40&fit=crop" },
                { name: "Marcus Rodriguez", university: "Richmond RC", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
                { name: "Katie Miller", university: "Oxford UUCC", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop" }
              ].map((followed, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={followed.image} alt={followed.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <h4 className="font-medium text-black">{followed.name}</h4>
                    <p className="text-sm text-gray-600">{followed.university}</p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Following</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showReviews && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <button onClick={() => setShowReviews(false)}>
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-gray-500 font-medium">Reviews</span>
            <div className="w-6"></div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {/* Demo reviews */}
              {[
                {
                  reviewer: "Alice Johnson",
                  activity: "Westway Climbing Session",
                  rating: 5,
                  comment: "Maddie is an excellent climbing coach! Very patient and encouraging.",
                  date: "2 weeks ago",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop"
                },
                {
                  reviewer: "Sarah Chen",
                  activity: "Richmond Park Cycling",
                  rating: 5,
                  comment: "Great organizer, very safety-conscious and fun to ride with!",
                  date: "1 month ago",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                },
                {
                  reviewer: "Emma Wilson",
                  activity: "Beginner Climbing Workshop",
                  rating: 4,
                  comment: "Really helpful for beginners. Clear instructions and good energy.",
                  date: "6 weeks ago",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop"
                }
              ].map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={review.image} alt={review.reviewer} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-black text-sm">{review.reviewer}</h4>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{review.activity}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
