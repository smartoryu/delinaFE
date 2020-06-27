import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import { Table, Button, Input, UncontrolledTooltip, Label } from "reactstrap";
import { API } from "../../API";
import Modal from "../../components/Modal";
import { connect } from "react-redux";
import { getProduct } from "../../redux/action";

function ManageProduct() {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductEdit, setDataProductEdit] = useState([]);
  const [dataProductDelete, setDataProductDelete] = useState([]);

  const [modalAdd, setModalAdd] = useState(false);
  const toggleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const [editImage, setEditImage] = useState({
    editImageFileName: "Please Select an Image...",
    editImageFile: undefined,
  });

  const [modalEdit, setModalEdit] = useState(false);
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const [modalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const toggleDataEdit = (i) => {
    setDataProductEdit(dataProduct[i]);
    setModalEdit(!modalEdit);
  };

  const toggleDataDelete = (i) => {
    setDataProductDelete(dataProduct[i]);
    setModalDelete(!modalDelete);
  };

  const [addData, setAddData] = useState({});

  const handleAddData = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
  };

  const [addImage, setAddImage] = useReducer((addImage, { type, payload }) => {
    switch (type) {
      case "add":
        return addImage.length <= 4 ? [...addImage, payload] : addImage;
      case "remove":
        return addImage.filter((_, index) => index !== payload);
      case "change":
        return payload;
      default:
        return addImage.filter((val) => val);
    }
  }, []);

  const onAddImageFileChange = (images) => {
    images.forEach((Files) => {
      setAddImage({ type: "add", payload: Files });
    });
  };
  const onDeleteImage = (index) => {
    setAddImage({ type: "remove", payload: index });
  };

  useEffect(() => {
    Axios.get(`${API}/data_product/product`)
      .then((res) => {
        setDataProduct(res.data.dataProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [draggedItem, setDraggedItem] = useState(null);
  function onDragStart(e, index) {
    setDraggedItem(addImage[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }
  function onDragOver(index) {
    const draggedOverItem = addImage[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let newItems = addImage.filter((item) => item !== draggedItem);

    // add the dragged item after the dragged over item
    newItems.splice(index, 0, draggedItem);

    setAddImage({ type: "change", payload: newItems });
    // setItems(newItems);
  }
  function onDragEnd(e) {
    e.preventDefault();
    setDraggedItem(null);
  }

  const onEditImageFileChange = (event) => {
    var file = event.target.files[0];
    if (file) {
      setEditImage({
        ...editImage,
        editImageFileName: file.name,
        editImageFile: event.target.files[0],
      });
    } else {
      setEditImage({
        ...editImage,
        editImageFileName: "please Seleact an Image",
        editImageFile: undefined,
      });
    }
  };

  const addProduct = () => {
    var formdata = new FormData();
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    addImage.forEach((image) => formdata.append("image", image));
    // formdata.append("image", addImage); //jangan lupa di tambahin playcode dari kenang
    formdata.append("data", JSON.stringify(addData));

    Axios.post(`${API}/data_product/postProduct`, formdata, Headers)
      .then((res) => {
        setDataProduct(res.data.dataProduct);
        console.log(res);

        setAddData({});
        setModalAdd(!modalAdd);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProduct = () => {
    var formdata = new FormData();
    const data = {
      nama: dataProductEdit.nama,
      harga: dataProductEdit.harga,
      stock: dataProductEdit.stock,
      deskripsi: dataProductEdit.deskripsi,
    };
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    formdata.append("image", editImage.editImageFile);
    formdata.append("data", JSON.stringify(data));

    Axios.put(`${API}/data_product/editProduct/${dataProductEdit.id}`, formdata, Headers)
      .then((res) => {
        setDataProduct(res.data.dataProduct);
        setModalEdit(!modalEdit);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = () => {
    Axios.delete(`${API}/data_product/deleteProduct/${dataProductDelete.id}`)
      .then((res) => {
        setDataProduct(res.data.dataProduct);
        setModalDelete(!modalDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderProduct = () => {
    return dataProduct.map((val, i) => {
      // console.log(dataProduct);

      return (
        <tr key={i}>
          <th>{i + 1}</th>
          <td>{val.nama}</td>
          <td>{val.harga}</td>
          <td>{val.stock}</td>
          <td>{val.deskripsi}</td>
          <td>
            <Button onClick={() => null} className="btn btn-primary">
              Image
            </Button>
            {/* <img src={`${API + val.image1}`} height="50px" alt={val.nama} /> */}
          </td>
          <td>
            <Button onClick={() => toggleDataEdit(i)} className="btn btn-primary">
              Edit
            </Button>
            <Button onClick={() => toggleDataDelete(i)} className="btn btn-danger">
              {" "}
              Delete{" "}
            </Button>
          </td>
        </tr>
      );
    });
  };

  console.log("addImage", addImage);
  return (
    <div className="App manage-product">
      <Modal
        className="modal-add-product"
        buttonName="ADD"
        title="Add Product"
        toggle={toggleModalAdd}
        modal={modalAdd}
        actionFunc={addProduct}>
        <Input
          className="mb-3"
          type="text"
          placeholder="Input Nama Product"
          name="nama"
          onChange={handleAddData}
        />
        <Input
          className="mb-3"
          type="text"
          placeholder="Input Harga Product"
          name="harga"
          onChange={handleAddData}
        />
        <Input
          className="mb-3"
          type="text"
          placeholder="Input Stock Product"
          name="stock"
          onChange={handleAddData}
        />
        <Input
          className="mb-3"
          type="text"
          placeholder="Input Deskripsi Product"
          name="deskripsi"
          onChange={handleAddData}
        />
        <Label
          for="add-image-input"
          className={`btn btn-sm btn-secondary ${addImage.length === 4 ? "disabled" : ""}`}>
          Add Image
        </Label>
        <Input
          id="add-image-input"
          type="file"
          disabled={addImage.length === 4}
          multiple
          max={4}
          tabIndex="-1"
          accept="image/png,image/webp,image/jpg,image/jpeg"
          placeholder="Input Image Product"
          name="image"
          style={{ display: "none" }}
          onChange={(event) => onAddImageFileChange(Array.from(event.target.files))}
        />
        <div className="list-image">
          <ul>
            {addImage.map((file, id) => (
              <div key={id} onDragOver={() => onDragOver(id)}>
                <li>
                  <span>{id + 1}</span>
                  <img
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                    onDragEnd={onDragEnd}
                    id={`uploaded-image${id}`}
                    onClick={() => onDeleteImage(id)}
                    src={URL.createObjectURL(file)}
                    alt={file.name}></img>
                  <UncontrolledTooltip placement="right" target={`uploaded-image${id}`}>
                    Click to delete.
                  </UncontrolledTooltip>
                </li>
                <span>{file.name}</span>
              </div>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        buttonName="SAVE"
        title="Edit Product"
        toggle={toggleModalEdit}
        modal={modalEdit}
        actionFunc={editProduct}>
        <Input
          className="mb-3"
          type="text"
          placeholder="Input Nama Product"
          defaultValue={dataProductEdit.nama}
          onChange={(e) => setDataProductEdit({ ...dataProductEdit, nama: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Input Harga Product"
          value={dataProductEdit.harga}
          onChange={(e) => setDataProductEdit({ ...dataProductEdit, harga: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Input Stock Product"
          value={dataProductEdit.stock}
          onChange={(e) => setDataProductEdit({ ...dataProductEdit, stock: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Input Deskripsi Product"
          value={dataProductEdit.deskripsi}
          onChange={(e) =>
            setDataProductEdit({
              ...dataProductEdit,
              deskripsi: e.target.value,
            })
          }
        />
        <Input
          type="file"
          label={editImage.editImageFileName}
          id="addImage1"
          onChange={onEditImageFileChange}
        />
        <Input
          type="file"
          label={editImage.editImageFileName}
          id="addImage2"
          onChange={onEditImageFileChange}
        />
      </Modal>

      <Modal
        buttonName="Delete"
        title="Delete Product"
        toggle={toggleModalDelete}
        modal={modalDelete}
        actionFunc={deleteProduct}>
        Are You Sure ?
      </Modal>

      <Button style={{ marginTop: "25px" }} onClick={toggleModalAdd}>
        Add Data
      </Button>
      <Table style={{ marginTop: "25px" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Deskripsi</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderProduct()}</tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataProduct: state.ManageProduct.dataProduct,
  };
};

export default connect(mapStateToProps, { getProduct })(ManageProduct);
