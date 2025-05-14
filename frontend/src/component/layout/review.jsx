import { Fragment } from "react";

export default function Review({review}) {
    return (
        <Fragment>
            <div className="review-contain">
                <div className="review">
                    <div className="ratings mt-auto">
                        <div className="rating-outer" >
                            <div className="rating-inner" style={{ width: `${review.rating*20}%` }} ></div>
                        </div>
                    </div>
                </div>
                    <div className="text-secondary-emphasis" >{review.user.name}</div>
                    <div className="text-secondary" >{review.comment}</div>
                    <hr />
            </div>
        </Fragment>
    )
}