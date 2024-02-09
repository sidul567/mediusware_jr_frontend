import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";

function CustomModal() {
  const [show, setShow] = useState(true);
  const [showModalC, setShowModalC] = useState(false);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [onlyEven, setOnlyEven] = useState(false);
  const [data, setData] = useState({
    id: "",
    phone: "",
    country: "",
  });
  const [page, setPage] = useState(1);

  const handleClose = () => {
    setShow(false);
    navigate("/problem-2");
  };

  const handleCloseModalC = () => {
    setShowModalC(false);
  };

  const openModal = (type) => {
    navigate(`/modal/${type}`);
  };

  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let res;
      setLoading(true);
      if (type === "A") {
        res = await fetch(
          `https://contact.mediusware.com/api/contacts/?page=${page}`
        );
      } else {
        res = await fetch(
          `https://contact.mediusware.com/api/country-contacts/United%20States/`
        );
      }
      const data = await res.json();
      setResults(data.results);
      setDataLength(data.count);
      setLoading(false);
    };
    console.log(page);
    fetchData();
  }, [type, page]);

  const handleOpenContactDetails = (result) => {
    setData({
      id: result.id,
      phone: result.phone,
      country: result.country.name,
    });
    setShowModalC(true);
  };

  const filteredData = onlyEven
    ? results.filter((result) => result.id % 2 === 0)
    : results;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <button
                  className="btn"
                  style={{ color: "#46139F" }}
                  onClick={() => openModal("A")}
                >
                  All Contact
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="btn"
                  style={{ color: "#FF7F50" }}
                  onClick={() => openModal("B")}
                >
                  US Contact
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="btn"
                  style={{
                    backgroundClip: "#fff",
                    border: "1px solid #46139F",
                  }}
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto" }}>
            {/* {isLoading && <p>Loading...</p>} */}
            {!loading && (
              <InfiniteScroll
                hasMore={true}
                next={() => setPage(page + 1)}
                dataLength={dataLength}
                height={600}
                loader={<h4>Loading...</h4>}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData &&
                      filteredData.map((result, index) => (
                        <tr
                          onClick={() => handleOpenContactDetails(result)}
                          key={index}
                        >
                          <td>{result?.id}</td>
                          <td>{result?.phone}</td>
                          <td>{result?.country?.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </InfiniteScroll>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <div className="d-flex gap-2">
            <input type="checkbox" name="even" id="even" onClick={()=>setOnlyEven(!onlyEven)}/>
            <label htmlFor="even" className="ml-3 cursor-pointer">
              Only even
            </label>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalC} onHide={handleCloseModalC}>
        <Modal.Body>
          <div>
            <h1>ID #{data.id}</h1>
            <h3>Phone: {data.phone}</h3>
            <h5>Country: {data.country}</h5>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
