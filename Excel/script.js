
let selectedFile;
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [];

document.getElementById('finalOutput').innerHTML = "";
// function upload () {

// }
document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        
        var array= [];
    document.getElementById('finalOutput').innerHTML = "Please Wait while Where you Elevate";
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            //console.log(workbook);
            
            // document.getElementById('finalOutput').innerHTML = '';
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                //console.log(rowObject);                
                function groupBy(objectArray, property) {
                    return objectArray.reduce((acc, obj) => {
                        const key = obj[property].trim();
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(obj);
                        return acc;
                    }, {});
                }
                const groupedTeam = groupBy(rowObject, 'Team');
                let finalJson = {};
                for (let x in groupedTeam) {
                    finalJson[x] = groupBy(groupedTeam[x], 'Project Name');
                }
                let teamName = "";
                console.log(finalJson);
                for (let x in finalJson) {
                    teamName = "Team  " + x + " - ";
                    project(finalJson[x], x);
                }

                function project(obj, projectName) {
                    //console.log(obj);
                    for (let x in obj) {
                        let sum = obj[x].reduce((a, b) => a + b['Hours'], 0)
                        // let average = Math.round(sum / obj[x].length,2);
                        let average = sum / obj[x].length;

                        let str = (x + " - " + average + "\n");
                        // //console.log(teamName + str);
                        document.getElementById('finalOutput').innerHTML += teamName + str + 'hrs <br>';
                        array.push({TeamName:teamName,Average:average});
                    }
                    //console.log(array)
                }

            });
        }
    }
    else
    {
        alert('Please Check the File Format');
    }
});



