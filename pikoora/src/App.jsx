import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import { heroVideos, categoriesData } from './data/content';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');

  // 1. My List State with 30-Day Auto Delete Logic & LocalStorage Loading
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('app_my_list');
    if (!saved) return [];

    try {
      const parsedList = JSON.parse(saved);
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 Din in milliseconds
      const now = Date.now();

      // Sirf wohi items filter honge jinhe save hue 30 din se kam time hua hai
      return parsedList.filter(
        (item) => item.savedAt && now - item.savedAt < thirtyDaysInMs
      );
    } catch (e) {
      return [];
    }
  });

  const [playingVideo, setPlayingVideo] = useState(null);

  // 2. LocalStorage Syncing (Jab bhi myList update ho)
  useEffect(() => {
    localStorage.setItem('app_my_list', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  // 3. Toggle My List with Timestamp (savedAt)
  const toggleMyList = (video) => {
    if (myList.some((item) => item.id === video.id)) {
      setMyList(myList.filter((item) => item.id !== video.id));
    } else {
      const videoWithTimestamp = {
        ...video,
        savedAt: Date.now(), // 30-day calculation ke liye timestamp save ho raha hai
      };
      setMyList([...myList, videoWithTimestamp]);
    }
  };

  const currentHero = heroVideos[activeHeroIndex];

  const getFilteredCategories = () => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return categoriesData
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) => item.title.toLowerCase().includes(q)),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    if (selectedTab !== 'home' && selectedTab !== 'mylist') {
      return categoriesData.filter((cat) => cat.id === selectedTab);
    }

    return categoriesData;
  };

  const filteredCategories = getFilteredCategories();
  const isSearchActive = searchQuery.trim() !== '';

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#FFFFFF', paddingBottom: '90px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Scrollbar Hide Injected CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(5, 5, 5, 0.96)',
          backdropFilter: 'blur(12px)',
          zIndex: 90,
          borderBottom: '1px solid #1c1c1c',
        }}
      >
        <span
          style={{
            color: '#E50914',
            fontSize: '36px',
            fontWeight: '900',
            cursor: 'pointer',
            lineHeight: 1,
            textShadow: '0 0 16px rgba(229, 9, 20, 0.7)',
          }}
          onClick={() => {
            setSelectedTab('home');
            setSearchQuery('');
          }}
        >
          P
        </span>

        <div style={{ flex: 1, marginLeft: '24px', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search poems, jan cartoon, phonics, numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#141414',
              color: '#FFFFFF',
              border: '1px solid #333333',
              borderRadius: '24px',
              padding: '10px 20px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </header>

      {/* TOP 5 HERO BANNER */}
      {!isSearchActive && selectedTab === 'home' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            backgroundImage: `linear-gradient(to top, #050505 10%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.85) 100%), url(${currentHero.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '36px 28px',
            boxSizing: 'border-box',
            transition: 'background-image 0.5s ease-in-out',
          }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0', textShadow: '0 3px 10px rgba(0,0,0,0.9)' }}>
            {currentHero.title}
          </h1>
          <p style={{ fontSize: '15px', color: '#e0e0e0', margin: '0 0 10px 0', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
            {currentHero.subtitle}
          </p>
          <p style={{ fontSize: '12px', color: '#bbbbbb', margin: '0 0 20px 0' }}>
            {currentHero.tags.join(' • ')}
          </p>

          <div style={{ display: 'flex', gap: '16px', maxWidth: '420px', marginBottom: '20px' }}>
            <button
              onClick={() => setPlayingVideo(currentHero)}
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 0',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              ▶ Play
            </button>

            <button
              onClick={() => toggleMyList(currentHero)}
              style={{
                flex: 1,
                backgroundColor: myList.some((item) => item.id === currentHero.id) ? '#E50914' : 'rgba(255,255,255,0.22)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: '6px',
                padding: '12px 0',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              {myList.some((item) => item.id === currentHero.id) ? '✓ Saved' : '+ Add to List'}
            </button>
          </div>

          {/* 5 Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {heroVideos.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setActiveHeroIndex(idx)}
                style={{
                  width: idx === activeHeroIndex ? '28px' : '9px',
                  height: '9px',
                  borderRadius: '5px',
                  backgroundColor: idx === activeHeroIndex ? '#E50914' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div style={{ padding: '24px' }}>
        
        {/* MY LIST VIEW */}
        {selectedTab === 'mylist' ? (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#E50914' }}>
              My Saved List ({myList.length})
            </h2>
            {myList.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '20px' }}>
                {myList.map((video) => (
                  <div key={video.id} style={{ backgroundColor: '#111111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222222' }}>
                    <div style={{ position: 'relative', width: '100%', height: '140px', cursor: 'pointer' }} onClick={() => setPlayingVideo(video)}>
                      <img src={video.img || video.bgImage} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(229, 9, 20, 0.9)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFF"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 'bold', margin: 0, height: '36px', overflow: 'hidden' }}>{video.title}</p>
                      <button
                        onClick={() => toggleMyList(video)}
                        style={{ backgroundColor: '#222222', color: '#ff4d4d', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#888888', fontSize: '15px' }}>No videos saved in My List yet.</p>
            )}
          </div>
        ) : (
          /* CATEGORIES VIEW WITH NO SCROLLBAR */
          <div>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div key={cat.id} style={{ marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#FFFFFF' }}>
                    {cat.title}
                  </h2>
                  
                  {/* HORIZONTAL CAROUSEL (HIDDEN SCROLLBAR) */}
                  <div
                    className="no-scrollbar"
                    style={{
                      display: 'flex',
                      gap: '16px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      scrollBehavior: 'smooth',
                    }}
                  >
                    {cat.items.map((item) => {
                      const isSaved = myList.some((m) => m.id === item.id);
                      return (
                        <div
                          key={item.id}
                          style={{
                            minWidth: '220px',
                            maxWidth: '220px',
                            height: '280px',
                            backgroundColor: '#111111',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid #222222',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          {/* Image Thumbnail Area */}
                          <div
                            style={{ position: 'relative', width: '100%', height: '155px', cursor: 'pointer' }}
                            onClick={() => setPlayingVideo(item)}
                          >
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(229, 9, 20, 0.9)',
                                borderRadius: '50%',
                                width: '42px',
                                height: '42px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFF">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>

                          {/* Content & Action Buttons */}
                          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                            <p style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 8px 0', height: '36px', overflow: 'hidden', lineHeight: '1.3' }}>
                              {item.title}
                            </p>
                            
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => setPlayingVideo(item)}
                                style={{
                                  flex: 1,
                                  backgroundColor: '#FFFFFF',
                                  color: '#000000',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '8px 0',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                              >
                                ▶ Play
                              </button>
                              <button
                                onClick={() => toggleMyList(item)}
                                style={{
                                  flex: 1,
                                  backgroundColor: isSaved ? '#E50914' : '#222222',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '8px 0',
                                  fontSize: '11px',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                              >
                                {isSaved ? '✓ Saved' : '+ List'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaaaaa' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#E50914', marginBottom: '8px' }}>
                  No videos matched your search
                </p>
                <p style={{ fontSize: '14px' }}>Try searching for "jan", "lion", "phonics", "wheels" or "numbers"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FULLSCREEN PLAYER WITH CLOSE BUTTON */}
      {playingVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.96)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ width: '100%', maxWidth: '960px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFF' }}>{playingVideo.title}</span>
            <button
              onClick={() => setPlayingVideo(null)}
              style={{
                backgroundColor: '#E50914',
                color: '#FFF',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ width: '100%', maxWidth: '960px', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1`}
              title={playingVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* BOTTOM NAV BAR */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid #222222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '68px',
          zIndex: 90,
        }}
      >
        <div
          onClick={() => { setSelectedTab('home'); setSearchQuery(''); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: selectedTab === 'home' ? '#E50914' : '#888888' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
          <span style={{ fontSize: '11px', marginTop: '4px' }}>Home</span>
        </div>

        <div
          onClick={() => { setSelectedTab('stories'); setSearchQuery(''); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: selectedTab === 'stories' ? '#E50914' : '#888888' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
          <span style={{ fontSize: '11px', marginTop: '4px' }}>Stories</span>
        </div>

        <div
          onClick={() => { setSelectedTab('home'); setSearchQuery(''); }}
          style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#E50914', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 14px rgba(229, 9, 20, 0.7)', marginTop: '-18px' }}
        >
          <span style={{ color: '#FFF', fontSize: '24px', fontWeight: '900' }}>P</span>
        </div>

        <div
          onClick={() => { setSelectedTab('poems'); setSearchQuery(''); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: selectedTab === 'poems' ? '#E50914' : '#888888' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
          <span style={{ fontSize: '11px', marginTop: '4px' }}>Rhymes</span>
        </div>

        <div
          onClick={() => { setSelectedTab('mylist'); setSearchQuery(''); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: selectedTab === 'mylist' ? '#E50914' : '#888888' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
          <span style={{ fontSize: '11px', marginTop: '4px' }}>My List</span>
        </div>
      </nav>
    </div>
  );
}