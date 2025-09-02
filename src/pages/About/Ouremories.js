import React, { useState, useEffect } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import axios from 'axios'

const MemoriesSection = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Default fallback data
  const defaultMemories = [
    {
      imageUrl: "img/ourmemories/m1.jpg",
      metadata: { date: null, location: "Event Location" },
      title: "With Super Star",
      description: "Memorable moment with a celebrity"
    },
    {
      imageUrl: "img/ourmemories/m2.jpg",
      metadata: { date: null, location: "Official Meeting" },
      title: "With Minister",
      description: "Official meeting with government minister"
    }
  ];

  // Fetch memories from API
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4010/api/content/types/memory?isActive=true&limit=50');
        
        if (response.data.success && response.data.data.length > 0) {
          // Sort by order and creation date
          const sortedMemories = response.data.data.sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
                     setMemories([...defaultMemories, ...sortedMemories]);

        } else {
          // Use default data if no API data available
          setMemories(defaultMemories);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
        setError('Failed to load memories');
        // Use default data on error
        setMemories(defaultMemories);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);



  if (loading) {
    return (
      <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading memories...</p>
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
              {memories.map((memory, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 col-12"
                  key={memory._id || index}
                >
                  <div className="as_blog_box">
                    <div className="as_blog_img">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <img
                          src={memory.imageUrl || "img/ourmemories/m1.jpg"}
                          alt={memory.imageAlt || memory.title}
                          className="img-responsive"
                          onError={(e) => {
                            e.target.src = "img/ourmemories/m1.jpg"; // Fallback image
                          }}
                        />
                      </a>
                   
                    </div>
                    <h4 className="as_subheading">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {memory.title}
                      </a>
                    </h4>
                    {memory.description && (
                      <p className="text-muted small mt-2">
                        {memory.description}
                      </p>
                    )}
                    {memory.metadata?.location && (
                      <p className="text-muted small">
                        <i className="bi bi-geo-alt"></i> {memory.metadata.location}
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


const Ouremories = () => {
  return (
    <>
      <Header />
      <MemoriesSection />
      <Footer />
    </>
  )
}

export default Ouremories
