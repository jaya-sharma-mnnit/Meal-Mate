import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './List.css';
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while fetching the list");
    }
    setLoading(false);
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food removed successfully");
        await fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while removing the food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.length > 0 ? (
            list.map((item, index) => (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              </div>
            ))
          ) : (
            <p>No foods available</p>
          )}
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  url: PropTypes.string.isRequired
};

export default List;
