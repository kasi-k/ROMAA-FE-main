import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../../constant";

const initialMaterial = { material: "", qty: "", unit: "" };

const CreateEnquiry = ({ onclose, onSuccess }) => {
  const [tenders, setTenders] = useState([]);
  const [tenderId, setTenderId] = useState("");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [materials, setMaterials] = useState([{ ...initialMaterial }]);

  // 🔥 Fetch Tender List on Modal Open
  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const res = await axios.get(`${API}/tender/all`);

      setTenders(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch Tender List");
    }
  };

  // 🔥 When Tender Changes → Auto-fill Location
  const handleTenderChange = (id) => {
    setTenderId(id);

    const selected = tenders.find((t) => t.tender_id === id);

    if (selected) {
      setLocation(selected.tender_location?.city || "");
    }
  };

  const handleAddRow = () =>
    setMaterials([...materials, { ...initialMaterial }]);

  const handleDeleteRow = (i) => {
    if (materials.length === 1) return;
    setMaterials(materials.filter((_, idx) => idx !== i));
  };

  const handleChange = (i, field, value) => {
    const updated = [...materials];
    updated[i][field] = value;
    setMaterials(updated);
  };

  const handleSubmit = () => {
    if (!tenderId || !location || !dueDate) {
      toast.warning("Please fill all required fields!");
      return;
    }

    const empty = materials.some((m) => !m.material || !m.qty || !m.unit);
    if (empty) {
      toast.warning("Please fill all material details!");
      return;
    }

    const payload = {
      tenderId,
      location,
      dueDate,
      materials,
    };

    console.log("Final Enquiry Data:", payload);

    toast.success("Enquiry Created Successfully!");
    onSuccess && onSuccess();
    onclose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-layout-dark w-full max-w-3xl rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4">
          <p className="text-2xl text-white font-semibold">Create Enquiry</p>
          <button
            onClick={onclose}
            className="text-gray-400 hover:text-red-500"
          >
            <IoClose size={28} />
          </button>
        </div>

        <div className="p-6">
          {/* ENQUIRY DETAILS */}
          <h2 className="text-lg font-semibold text-white mb-3">
            Enquiry Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tender Dropdown */}
            <div>
              <label className="text-white text-sm">Project ID</label>
              <select
                value={tenderId}
                onChange={(e) => handleTenderChange(e.target.value)}
                className="w-full border bg-layout-dark border-border-dark-grey rounded px-3 py-2 mt-1  text-white"
              >
                <option value="" className="text-white">
                  Select Project
                </option>

                {tenders.map((t, i) => (
                  <option key={i} value={t.tender_id} className="text-white">
                    {t.tender_id}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-filled Location */}
            <div>
              <label className="text-white text-sm">Location</label>
              <input
                value={location}
                readOnly
                className="w-full border border-border-dark-grey rounded px-3 py-2 mt-1 bg-gray-800 text-white"
                placeholder="Location"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="text-white text-sm">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-border-dark-grey rounded px-3 py-2 mt-1 text-white"
              />
            </div>
          </div>

          {/* MATERIAL TABLE */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-2">
              Materials Required
            </h2>

            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAddRow}
                className="bg-darkest-blue text-white px-6 py-2 rounded"
              >
                + Add Row
              </button>
            </div>

            <table className="w-full text-white text-sm border border-border-dark-grey">
              <thead>
                <tr className="bg-[#1f1f1f]">
                  <th className="px-3 py-2 border">#</th>
                  <th className="px-3 py-2 border">Material</th>
                  <th className="px-3 py-2 border">Qty</th>
                  <th className="px-3 py-2 border">Unit</th>
                  <th className="px-3 py-2 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {materials.map((row, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 border">{i + 1}</td>

                    <td className="px-3 py-2 border">
                      <input
                        className="bg-transparent w-full outline-none text-white"
                        value={row.material}
                        onChange={(e) =>
                          handleChange(i, "material", e.target.value)
                        }
                        placeholder="Material"
                      />
                    </td>

                    <td className="px-3 py-2 border">
                      <input
                        className="bg-transparent w-full outline-none text-white"
                        value={row.qty}
                        onChange={(e) => handleChange(i, "qty", e.target.value)}
                        placeholder="Qty"
                      />
                    </td>

                    <td className="px-3 py-2 border">
                      <input
                        className="bg-transparent w-full outline-none text-white"
                        value={row.unit}
                        onChange={(e) =>
                          handleChange(i, "unit", e.target.value)
                        }
                        placeholder="Unit"
                      />
                    </td>

                    <td className="px-3 py-2 border text-center">
                      {materials.length > 1 && (
                        <button
                          onClick={() => handleDeleteRow(i)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={onclose}
              className="px-6 py-3 border border-gray-500 text-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#142e56] text-white rounded"
            >
              Save Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEnquiry;
