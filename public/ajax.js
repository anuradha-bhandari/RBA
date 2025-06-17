let ajaxImpl = function (str) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tableBody = document.getElementById("tblBody");
            tableBody.innerHTML = "";

            let jsonObj = JSON.parse(this.responseText);

            jsonObj.forEach(function (item, index) {
                let row = document.createElement("tr");

                // SR.NO
                let column = document.createElement("td");
                column.innerHTML = "" + (index + 1);
                row.appendChild(column);

                // CATEGORY NAME
                column = document.createElement("td");
                column.innerHTML = "" + item.name;
                row.appendChild(column);

                // DELETE ICON
                column = document.createElement("td");
                column.innerHTML = "<a href='/deleteCat?id=" + item.id + "'><i class='fa-solid fa-trash' style='color: hsl(4, 89%, 48%); font-size:20px;'></i></a>";
                row.appendChild(column);

                // UPDATE ICON
                column = document.createElement("td");
                column.innerHTML = "<a href='/updatecategory?id=" + item.id + "'><i class='fa-solid fa-pen-to-square' style='color: #138138; font-size:20px;'></i></a>";
                row.appendChild(column);

                // Append row to table body
                tableBody.appendChild(row);
            });
        }
    };

    xhttp.open("GET", "/searchcatbyname?sd=" + str, true);
    xhttp.send();
};
