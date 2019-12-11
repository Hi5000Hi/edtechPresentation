import React, { useState, useEffect } from "react";
import FormDialog from "./newuser";
import MUIDataTable from "mui-datatables";
import { db } from "./firebase";

export function Users(props) {
  const columns = ["Netid", "Name", "Department"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("user").onSnapshot(snapshot => {
      const updated_user = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        updated_user.push({
          Netid: data.Netid,
          Name: data.Name,
          Department: data.Department,
          id: doc.id
        });
      });
      setData(updated_user);
    });
    return unsubscribe;
  }, []);

  //[Log] {lookup: {3: true, 4: true}, data: [{index: 1, dataIndex: 3}, {index: 2, dataIndex: 4}]}

  const handleDeleteUser = rowsDeleted => {
    for (const i of rowsDeleted.data) {
      db.collection("user")
        .doc(data[i.dataIndex].id)
        .delete();
    }
    console.log(rowsDeleted);
  };

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    onRowsDelete: handleDeleteUser
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
        <MUIDataTable
          title={"Users"}
          data={data}
          columns={columns}
          options={options}
        />
        <FormDialog />
      </div>
    </div>
  );
}
