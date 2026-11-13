import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [nftDetails, setNftDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { nftId } = useParams();

  useEffect(() => {
    const fetchNftDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );
        setNftDetails(response.data);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNftDetails();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="500px" borderRadius="8px" />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="300px" height="40px" />

                    <div className="item_info_counts">
                      <Skeleton width="80px" height="30px" />
                      <Skeleton width="80px" height="30px" />
                    </div>

                    <Skeleton width="100%" height="80px" />

                    <div className="item_author">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Skeleton width="125px" height="20px" />
                    </div>

                    <div className="item_author">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Skeleton width="125px" height="20px" />
                    </div>

                    <Skeleton width="75px" height="20px" />
                  </div>
                </div>
              </div>
            ) : nftDetails ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nftDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nftDetails.title}
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{nftDetails.title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nftDetails.views}
                      </div>

                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nftDetails.likes}
                      </div>
                    </div>

                    <p>{nftDetails.description}</p>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>

                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={nftDetails.ownerImage}
                                alt={nftDetails.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="author_list_info">
                            <Link to={`/author/${nftDetails.ownerId}`}>
                              {nftDetails.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>

                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={nftDetails.creatorImage}
                                alt={nftDetails.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="author_list_info">
                            <Link to={`/author/${nftDetails.creatorId}`}>
                              {nftDetails.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      <h6>Price</h6>

                      <div className="nft-item-price">
                        <img src={EthImage} alt="Ethereum" />
                        <span>{nftDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Unable to load this item.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
