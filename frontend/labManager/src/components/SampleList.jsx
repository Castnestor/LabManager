import { useAxios } from "../hooks/useAxios";

function SampleList(props) {

//url from API to snet to my custom hook
const url = "/api/samples/";
//storing result of custom hook (useAxios)
const samples = useAxios(url, []);

  const sampleList = samples.map((sample) => (
    <li key={sample.id}>Description: {sample.description}</li>
  ));

  return (
    <ul>{sampleList}</ul>
  );
}

export default SampleList;