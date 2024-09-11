import React, { useState, useEffect } from 'react';


import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  function logKey(e) {
    const logMessage = `Screen X/Y: ${e.screenX}, ${e.screenY}\nClient X/Y: ${e.clientX}, ${e.clientY}`
    console.log(logMessage)
  }


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    window.addEventListener('mousemove', logKey);
    return () => {
      window.removeEventListener('mousemove', logKey)
    }
    

  }, []);

  useEffect(()=>{
    document.title = `Count:${count}`;
    console.log(count)

  },[count]);

  return (
    <>
      <div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='box'>
            {posts.map((post) => (
              <div key={post.id}>
                <img src={post.url} alt={post.title} />
                <h3>{post.title}</h3>

              </div>
            ))}
          </div>

        </>
      )}
    </>
  );
}

export default App;
