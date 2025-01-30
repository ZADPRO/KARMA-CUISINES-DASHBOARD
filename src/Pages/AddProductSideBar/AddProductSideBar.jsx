import { Beef, CalendarRange, Euro, Percent, Utensils } from "lucide-react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import decrypt from "../../helper";
import { FileUpload } from "primereact/fileupload";

export default function AddProductSideBar() {
  const toastRef = useRef(null);

  const [formData, setFormData] = useState({
    refVendorId: 0,
    restaurantName: "",
    productName: "",
    productImage: "",
    productPrice: "",
    description: "",
  });

  const [updateOffersEnabled, setUpdateOffersEnabled] = useState(false);
  const [customOffersEnabled, setCustomOffersEnabled] = useState(false);
  const [customOfferRangeEnabled, setCustomOfferRangeEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [dateSelect, setDateSelect] = useState(null);
  const [rangeSelect, setRangeSelect] = useState(null);

  const categories = [
    { name: "Fast Food", code: "FF" },
    { name: "Fine Dining", code: "FD" },
    { name: "Cafe", code: "CA" },
    { name: "Bakery", code: "BK" },
    { name: "Seafood", code: "SF" },
  ];

  const [restroDetails, setRestroDetails] = useState([]);

  const ratings = [
    { name: "1 Star", code: 1 },
    { name: "2 Stars", code: 2 },
    { name: "3 Stars", code: 3 },
    { name: "4 Stars", code: 4 },
    { name: "5 Stars", code: 5 },
  ];

  const [products, setProducts] = useState([]);
  console.table("products", products);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/vendorRoutes/getVendorList", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setRestroDetails(data.vendorList);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });

    axios
      .get(import.meta.env.VITE_API_URL + "/vendorRoutes/getOffers", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.table("offersss", data.restroOffers);

        setProducts(data.restroOffers);
      });
  }, []);

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDropdownChange = (e) => {
    const selectedRestro = e.value;

    setFormData((prevData) => ({
      ...prevData,
      refVendorId: selectedRestro.refVendorId,
      restaurantName: selectedRestro.refVendorName,
    }));
  };

  const handleUploadSuccess = (response) => {
    console.log("Upload Successful:", response);
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous state
      productImage: response.filePath, // Update the productImage
    }));
  };

  const handleUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  const customUploader = async (event) => {
    console.table("event", event);
    const file = event.files[0]; // Assuming single file upload
    const formData = new FormData();
    formData.append("logo", file);
    console.log("formData", formData);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]); // Log each field in the FormData
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/vendorRoutes/LogoUpload",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
          },
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      localStorage.setItem("JWTtoken", "Bearer " + data.token);

      if (data.success) {
        handleUploadSuccess(data);
      } else {
        handleUploadFailure(data);
      }
    } catch (error) {
      handleUploadFailure(error);
    }
  };

  const handleOfferSelect = (e) => {
    setSelectedOffer(e.value);
    console.log("Offer Details:");
    console.log("refCoupon:", e.value.refCoupon);
    console.log("refDiscountPrice:", e.value.refDiscountPrice);
    console.log("refEndDate:", e.value.refEndDate);
    console.log("refOfferId:", e.value.refOfferId);
    console.log("refOfferMinValue:", e.value.refOfferMinValue);
    console.log("refStartDate:", e.value.refStartDate);
  };

  const handleSubmit = () => {
    const payload = {
      refVendorId: formData.refVendorId,
      restaurantName: formData.restaurantName,
      productName: formData.productName,
      productPrice: formData.productPrice,
      productImage: formData.productImage,
      category: selectedCategory ? selectedCategory.name : null,
      description: formData.description,
      rating: selectedRating ? selectedRating.name : null,
      offer: selectedOffer ? selectedOffer.name : null,
      dateSelect: dateSelect ? dateSelect : null,
      rangeSelect: rangeSelect ? rangeSelect : null,
    };

    axios
      .post(
        import.meta.env.VITE_API_URL + "/vendorRoutes/addProduct",
        {
          refVendorId: formData.refVendorId,
          restaurantName: formData.restaurantName,
          productName: formData.productName,
          productPrice: formData.productPrice,
          productImage: formData.productImage,
          category: selectedCategory ? selectedCategory.name : null,
          description: formData.description,
          rating: selectedRating ? selectedRating.name : null,
          offer: selectedOffer ? selectedOffer.name : null,
          dateSelect: dateSelect ? dateSelect : null,
          rangeSelect: rangeSelect ? rangeSelect : null,
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
          },
        }
      )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        localStorage.setItem("JWTtoken", "Bearer " + data.token);
        if (data.success) {
          formData.refVendorId = 0;
          formData.restaurantName = "";
          formData.productName = "";
          formData.productPrice = "";
          setSelectedCategory(null);
          formData.description = "";
          setSelectedRating(null);
          setSelectedOffer(null);
          setDateSelect(null);
          setRangeSelect(null);
        }
      });

    console.log("Payload:", payload);

    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Form submitted successfully!",
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toastRef} />

      <div className="flex flex-column gap-10">
        <h3>Add Products</h3>
        <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
          <div className="inputForms w-full">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Utensils size={20} />
              </span>
              <Dropdown
                value={restroDetails.find(
                  (restro) => restro.refVendorId === formData.refVendorId
                )}
                options={restroDetails}
                onChange={handleDropdownChange}
                placeholder="Select a Restaurant"
                optionLabel="refVendorName"
                className="w-full"
              />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Beef size={20} />
                </span>
                <InputText
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={(e) => handleInputChange(e, "productName")}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <InputText
                  placeholder="Product Price"
                  value={formData.productPrice}
                  onChange={(e) => handleInputChange(e, "productPrice")}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Beef size={20} />
                </span>
                <Dropdown
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.value)}
                  options={categories}
                  optionLabel="name"
                  placeholder="Category"
                  className="w-full md:w-14rem"
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <InputText
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <Dropdown
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.value)}
                  options={ratings}
                  optionLabel="name"
                  placeholder="Rating"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="fileUpload mt-3 flex-col">
                <FileUpload
                  name="logo"
                  customUpload
                  className="mt-3"
                  uploadHandler={customUploader}
                  accept="image/*"
                  maxFileSize={10000000}
                  emptyTemplate={
                    <p className="m-0">
                      Drag and drop your logo here to upload.
                    </p>
                  }
                />{" "}
              </div>
            </div>
            <div className="mt-3">
              <div className="gap-5 mt-3 flex">
                <div
                  className="flex gap-3 mt-3 flex-1"
                  style={{ flexDirection: "column" }}
                >
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      checked={updateOffersEnabled}
                      onChange={(e) => setUpdateOffersEnabled(e.value)}
                    />
                    <span className="">Offers Applied</span>
                  </div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <Percent size={20} />
                    </span>
                    <Dropdown
                      value={selectedOffer}
                      disabled={!updateOffersEnabled}
                      onChange={handleOfferSelect}
                      options={products}
                      optionLabel="refCoupon"
                      placeholder="Select Offer"
                      className="w-full md:w-14rem"
                    />
                  </div>
                </div>
                <div
                  className="flex gap-3 mt-3 flex-1"
                  style={{ flexDirection: "column" }}
                >
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!updateOffersEnabled}
                      checked={customOffersEnabled}
                      onChange={(e) => {
                        setCustomOffersEnabled(e.value);
                        if (e.value) {
                          setCustomOfferRangeEnabled(false);
                        }
                      }}
                    />
                    <span>Custom Date Select</span>
                  </div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <CalendarRange size={20} />
                    </span>
                    <Calendar
                      value={dateSelect}
                      disabled={!(customOffersEnabled && updateOffersEnabled)}
                      onChange={(e) => setDateSelect(e.value)}
                      selectionMode="multiple"
                      readOnlyInput
                      placeholder="Select Offer Dates"
                      hideOnRangeSelection
                    />
                  </div>
                </div>

                <div
                  className="flex gap-3 mt-3 flex-1"
                  style={{ flexDirection: "column" }}
                >
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!updateOffersEnabled}
                      checked={customOfferRangeEnabled}
                      onChange={(e) => {
                        setCustomOfferRangeEnabled(e.value);
                        if (e.value) {
                          setCustomOffersEnabled(false);
                        }
                      }}
                    />
                    <span>Custom Range Selected</span>
                  </div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <CalendarRange size={20} />
                    </span>
                    <Calendar
                      value={rangeSelect}
                      disabled={
                        !(customOfferRangeEnabled && updateOffersEnabled)
                      }
                      onChange={(e) => setRangeSelect(e.value)}
                      selectionMode="range"
                      readOnlyInput
                      placeholder="Offer Range"
                      hideOnRangeSelection
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-4 justify-content-end">
          <Button
            label="Submit"
            icon="pi pi-arrow-right"
            iconPos="right"
            severity="success"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
