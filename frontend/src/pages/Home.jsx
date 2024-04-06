import {Link} from "react-router-dom"
export default function Home() {
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="section">
                    <h1>25% off sitewide</h1>
                    <p>Come for the sale. Stay for the art. Support an artist.</p>
                    <button><Link to='/products'>Expolre the products</Link></button>
                </div>
            </div>
            <div className="cards">
                <div className="row">
                    <div className="col-lg-4">
                    <div className="card " style={{width: "18rem"}}>
                        <img src="image1.jpg" className="card-img-top" alt="image2"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="card" style={{width: "18rem"}}>
                        <img  src="image3.jpg" className="card-img-top" alt="image1"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="card " style={{width: "18rem"}}>
                        <img src="image2.jpg" className="card-img-top" alt="image3"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
