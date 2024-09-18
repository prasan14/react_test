import { Link } from "@mui/joy";
import { useEffect, useState } from "react";
import Select from 'react-select'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
function AddSchema({setOpen,segmentName,setNameError}) {
    const [schema,setSchema] = useState([]);
    const [schemaSelected, setSchemaSelected] = useState("");
    const [error, setError] = useState("");
    const initial_options = [
        { value: 'first_name', label: 'First Name' },
        { value: 'last_name', label: 'Last Name' },
        { value: 'gender', label: 'Gender' },
        { value: 'age', label: 'Age' },
        { value: 'account_name', label: 'Account Name' },
        { value: 'city', label: 'City' },
        { value: 'state', label: 'State' }
    ];
    const [options,setOptions] = useState(initial_options);

    const handleClick = () => {
        if(schemaSelected){
            setError(false)
            setSchema(previousSchema=>[...previousSchema, {id:Date.now(),schemas:schemaSelected}]);
            setSchemaSelected("");
        }
        else{
            setError(true)
        }
    } 

    useEffect(()=>{
        var tempOptions = initial_options;
        schema.map((schema)=>{
            tempOptions = tempOptions.filter((temp)=>{
                return temp.value !== schema.schemas.value
            });
            return schema
        });
       setOptions(tempOptions);
    },[schema]);

    const handleChange = (value,id) => {
        setSchema(previousSchema=>previousSchema.map((schema)=>{
            if(schema.id === id){
                return {id:id,schemas:value}
            }
            else{
                return schema
            }
        }));
    }
    const handleSubmit = () => {
        if(!segmentName){
            setNameError(true)
        }
        else{
            fetch('	https://webhook.site/77255e18-c07b-48d2-9c67-cc05dcfddcb3', {
                method: 'POST',
                body: JSON.stringify({
                    test: 'TEst'
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Olkay")
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }
    return(
        <>
         <div className="dropdownBox">
            {
                schema.map((schema,index)=>{
                    return <Select key={index} options={options} value={schema.schemas} className='dropdownSelect' name={schema.id} onChange={(value,actionMeta)=>handleChange(value,actionMeta.name)} />
                })
            }
            <Select options={options} placeholder="Add schema to segment" onChange={(schema)=>{setError(false);setSchemaSelected(schema)}} value={schemaSelected} />
            {error && <span className="error">Select any one Schema to add</span>}
            <Link underline="always" variant="plain" onClick={handleClick} sx={{fontWeight: 500,marginTop:2}}>+ Add new schema</Link>
        </div>
        <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={handleSubmit}>
              Save the Segment
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </>
       
    )
}

export default AddSchema