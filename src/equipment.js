import React, { useState, useEffect } from "react";
import FormDialog from "./newequipment";
import MUIDataTable from "mui-datatables";
import { db } from "./firebase";

export function Equipment(props) {
  const columns = ["MSE", "Serial", "Model", "User"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("equipment").onSnapshot(snapshot => {
      const updated_equipment = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        updated_equipment.push({
          MSE: data.mse,
          Serial: data.serial,
          Model: data.model,
          User: data.user,
          id: doc.id
        });
      });
      setData(updated_equipment);
    });
    return unsubscribe;
  }, []);

  //[Log] {lookup: {3: true, 4: true}, data: [{index: 1, dataIndex: 3}, {index: 2, dataIndex: 4}]}

  const handleDeleteEquipment = rowsDeleted => {
    for (const i of rowsDeleted.data) {
      db.collection("equipment")
        .doc(data[i.dataIndex].id)
        .delete();
    }
    console.log(rowsDeleted);
  };

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    onRowsDelete: handleDeleteEquipment
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
        <MUIDataTable
          title={"Equipment"}
          data={data}
          columns={columns}
          options={options}
        />
        <FormDialog />
      </div>
    </div>
  );
}
