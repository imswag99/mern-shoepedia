import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUpload, FaRegTrashCan } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(50);
  const [gender, setGender] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/product/${id}`).then(({ data }) => {
      setTitle(data.title);
      setDescription(data.description);
      setDetails(data.details);
      setPrice(data.price);
      setBrand(data.brand);
      setCategory(data.category);
      setGender(data.gender);
      setStock(data.stock);
      setAddedPhotos(data.images);
    });
  }, [id]);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/product/upload-by-link", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });

    setPhotoLink("");
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }

    const { data: filenames } = await axios.post("/product/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };

  const removeImage = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectCoverImage = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  };

  const saveForm = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      brand,
      category,
      price,
      addedPhotos,
      gender,
      stock,
      details,
    };

    if (id) {
      await axios.put("/product", {
        id,
        ...productData,
      });
      setRedirect(true);
    } else {
      await axios.post("/product", productData);
      setRedirect(true);
    }
  };

  const deleteProduct = async (e) => {
    await axios.delete(`/product/${id}`);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/admin/products"} />;
  }

  return (
    <>
      <div className="w-[15%]"></div>
      <div className="bg-mainBg w-[85%] flex flex-col justify-center items-center">
        <div className="w-[80%] sm:w-[100%] p-8 text-text">
          <form onSubmit={saveForm} className="w-full">
            <div className="w-full mb-8 grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div
                    className="h-50 flex relative rounded-2xl overflow-hidden"
                    key={link}
                  >
                    <img
                      className="w-full obejct-cover"
                      src={"http://localhost:5000/uploads/" + link}
                      alt=""
                    />
                    <button
                      onClick={(e) => selectCoverImage(e, link)}
                      className="absolute bottom-3 left-3 text-mainBg bg-text p-2 rounded-2xl"
                    >
                      {link === addedPhotos[0] && <FaStar size={20} />}
                      {link !== addedPhotos[0] && <FaRegStar size={20} />}
                    </button>
                    <button
                      onClick={(e) => removeImage(e, link)}
                      className="absolute bottom-3 right-3 text-mainBg bg-text p-2 rounded-2xl"
                    >
                      <FaRegTrashCan size={20} />
                    </button>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="add link... jpg"
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                />
                <button
                  onClick={addPhotoByLink}
                  className="bg-primary py-1 px-2 w-[30%] sm:w-[20%] text-sm sm:text-xs text-text uppercase font-semibold rounded-2xl transition-all hover:text-primary hover:bg-text"
                >
                  Add image
                </button>
              </div>
              <div className="border border-text rounded-2xl flex justify-center">
                <label className="flex gap-1 items-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={uploadPhoto}
                  />
                  <FaUpload />
                  Upload
                </label>
              </div>
              <div>
                <label>Title </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Air Jordan"
                  required
                />
              </div>
              <div>
                <label>Gender </label>
                <br />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select a gender</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label>Brand </label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                  placeholder="Nike"
                  required
                />
              </div>
              <div>
                <label>Category </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  placeholder="sneaker"
                  required
                />
              </div>
              <div>
                <label>Price </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="price(in rupees)"
                  required
                />
              </div>
              <div>
                <label>Stock </label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  required
                />
              </div>
              <div>
                <label>Description </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Product details </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div>
                <button className="bg-primary p-2 w-[20%] sm:w-[40%] text-text uppercase font-semibold rounded-2xl transition-all hover:bg-green-700">
                  Save
                </button>
              </div>
            </div>
          </form>
          {id && (
            <div className="relative">
              <button
                onClick={deleteProduct}
                className="absolute bottom-1 right-0 bg-primary mt-8 p-2 w-[20%] sm:w-[20%] text-text uppercase font-semibold rounded-2xl transition-all hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductForm;
