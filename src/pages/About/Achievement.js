import React, { useState, useEffect } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Breadcrumb from '../../component/Breadcrumb'
import axios from 'axios'

const AchievementSection = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Default fallback data
  const defaultAchievements = [
    {
      imageUrl: "img/c1.jpg",
      metadata: { date: "2022-04-04" },
      title: "Reiki Level 1",
      description: "Achievement in Reiki Level 1 certification"
    },
    {
      imageUrl: "img/c2.jpg",
      metadata: { date: "2022-06-18" },
      title: "Reiki Level 2",
      description: "Achievement in Reiki Level 2 certification"
    },
    {
      imageUrl: "img/c3.jpg",
      metadata: { date: "2022-05-28" },
      title: "Basics Tarot Master Program",
      description: "Completed Basics Tarot Master Program"
    },
    {
      imageUrl: "img/c4.png",
      metadata: { date: null },
      title: "Basics Tarot Master Program",
      description: "Advanced Tarot Master certification"
    },
    {
      imageUrl: "img/c5.png",
      metadata: { date: "2023-05-19" },
      title: "Basics Tarot Master Program",
      description: "Professional Tarot Master certification"
    }
  ];

  // Fetch achievements from API
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4010/api/content/types/achievement?isActive=true&limit=50');
        
        if (response.data.success && response.data.data.length > 0) {
          // Sort by order and creation date
          const sortedAchievements = response.data.data.sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
           setAchievements([...defaultAchievements, ...sortedAchievements]);
        } else {
          // Use default data if no API data available
          setAchievements(defaultAchievements);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setError('Failed to load achievements');
        // Use default data on error
        setAchievements(defaultAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-- --, ----";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      });
    } catch {
      return "-- --, ----";
    }
  };

  if (loading) {
    return (
      <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading achievements...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
      <div className="container">
        {error && (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-warning" role="alert">
                {error} - Showing default content
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {achievements.map((achievement, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 col-12"
                  key={achievement._id || index}
                >
                  <div className="as_blog_box">
                    <div className="as_blog_img">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <img
                          src={achievement.imageUrl || "img/c1.jpg"}
                          alt={achievement.imageAlt || achievement.title}
                          className="img-responsive"
                          onError={(e) => {
                            e.target.src = "img/c1.jpg"; // Fallback image
                          }}
                        />
                      </a>
                    
                    </div>
                    <h4 className="as_subheading">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {achievement.title}
                      </a>
                    </h4>
                    {achievement.description && (
                      <p className="text-muted small mt-2">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const Achievement = () => {
  return (
    <>
      <Header />
      <AchievementSection />
      <Footer />
    </>
  )
}

export default Achievement
