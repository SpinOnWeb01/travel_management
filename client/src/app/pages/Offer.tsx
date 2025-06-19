
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import offer1 from '../../../public/images/offer-1.png';
import offer2 from '../../../public/images/offer-2.png';


export default function Offer () {

    return (
      <>
        <div className="offer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="offerbox">
                  <div className="offeritem col-md-3">
                    <Image
                      src={offer1}
                      alt="offer"
                      width={232}
                      height={182}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="offertext col-md-6">
                    <div className="content">
                      <div className="btn-offer">
                        <Link href="#">Special Offer</Link>
                      </div>

                      <h2 className="text-white text-center">
                        Grab Up To 40% Off <br />
                        On Your Favorite Destination
                      </h2>

                      <div className="call-to-action text-center">
                        <Link href="#">
                          BOOK NOW
                          <FontAwesomeIcon
                            icon={faArrowRightLong}
                            className="ms-0"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="offeritem col-md-3">
                    <Image
                      src={offer2}
                      alt="offer"
                      width={230}
                      height={227}
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}