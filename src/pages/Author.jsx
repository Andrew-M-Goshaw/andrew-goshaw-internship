import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import AOS from "aos";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams(); // Get the author ID from the URL
  const [nfts, setNfts] = useState([]);
  const [authorImage, setAuthorImage] = useState("");
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false); // State to track if the user is following
  const [followerCount, setFollowerCount] = useState(0);

  const handleFollow = () => {
    setIsFollowing(!isFollowing); // Toggle following state
    setFollowerCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1,
    ); // Increment or decremenet follower count
  };

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author");
        }

        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }

    AOS.init();
  }, [authorId]); // The effect depends on the author ID

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />

                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" height="24px" />

                            <span className="profile_username">
                              <Skeleton width="100px" height="20px" />
                            </span>

                            <span className="profile_wallet">
                              <Skeleton width="250px" height="20px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <Skeleton width="150px" height="40px" />
                    </div>
                  </div>
                ) : authorData ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img
                          src={authorData.authorImage}
                          alt={authorData.authorName}
                        />

                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}

                            <span className="profile_username">
                              @{authorData.tag}
                            </span>

                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>

                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followerCount} followers
                        </div>

                        <Link
                          to="#"
                          className="btn-main"
                          onClick={handleFollow}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Unable to load this author.</p>
                )}
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower">
                      {authorData.followers} followers
                    </div>
                    <Link to="#" className="btn-main" onClick={handleFollow}>
                      {isFollowing ? "unfollow" : "Follow"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems authorData={authorData} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
