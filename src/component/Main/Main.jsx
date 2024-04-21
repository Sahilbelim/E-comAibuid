import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { CiShop } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Main = () => {
  const [form, setForm] = useState({
    prompt: "",
  });
  const [myparam, setMyparam] = useState({});
  const [userRes, setUserRes] = useState({});
  const [userFinalRes, setUserFinalRes] = useState({});
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsListening(true);
  };

  const stopListening = () => {
    setForm({ prompt: transcript });
    console.log(transcript);
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const micClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const finalRes = async (arr, prompt) => {
    console.log(arr, prompt);
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAgxq1_om6nJhYYsrV2WL51FavSS0RB3O4"; // Replace YOUR_API_KEY with your actual API key

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: ` using that data recoment to use which product thay can buy for him to wich product are perfect for him or his condittion 
              data : ${arr}
              conditions :${prompt}

              select one of the best most eficient products 
              // don't write object direct write value in card class div in   <h2  write one by one all details 
              let userFinalRes  only  output in bellow data d'not write above object in output // but still write value of it // values
                // giv all data as point wise
                // don't use  ** to highlight this use specification tag on it
                // all are write in div tags individually to separate all product name to use h2 tag // photo to use img tags//

                asin: 
climate_pledge_friendly: 
currency: 
delivery:  
is_amazon_choice:  
is_best_seller:  
is_prime:  
product_minimum_offer_price:  
product_num_offers:  
product_num_ratings:  
product_original_price:  
product_photo:  
product_price:  
product_star_rating:  
product_title:  
product_url:  
sales_volume:  
PRoduct_name with module_name:
Price:
Specifications:
Why_perfect_for_him:
product_meets_all_his_requirements:
message:




              `,
            },
          ],
        },
      ],
    };
try {
  

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    const { text: Output } = response.data.candidates[0].content.parts[0];

    console.log(Output);
    // const output = JSON.parse(Output);
    getSingleProduct(Output)
    setUserFinalRes(Output) 
    alert(Output);
    console.log(userFinalRes);
  } catch (error) {
    console.log(error);
  
  }
  };
  const fetchdata = async (param) => {
    console.log(param); // Check the value of param

    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: {
        query: "Phone",
        page: "1",
        country: "IN",
        category_id: "aps",
        max_price: "50000",
      },
      // headers: {
      //   "X-RapidAPI-Key": "1177adae1dmsheac775f607ac9ebp124f26jsn17bd3498e89c",
      //   "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      // },
      headers: {
        "X-RapidAPI-Key": "16d70c3a1fmsh16a5cb08cffe040p14673ajsn07207466f142",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.products);
      const data = response.data.data.products;
      setUserRes(data);
      console.log(response.data);
      console.log(response.data.data);
      console.log(response.data.data.products);

      finalRes(userRes, form.prompt);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit");

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAgxq1_om6nJhYYsrV2WL51FavSS0RB3O4"; // Replace YOUR_API_KEY with your actual API key

    try {
      const requestData = {
        contents: [
          {
            parts: [
              {
                text: `const options = {
                  method: 'GET',
                  url: 'https://real-time-amazon-data.p.rapidapi.com/search',
                  params: {
                    query: ' ',
                    page: ' ',
                    country: ' ',
                    category_id: ''
                  },
                  headers: {
                    'X-RapidAPI-Key': '1177adae1dmsheac775f607ac9ebp124f26jsn17bd3498e89c',
                    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
                  }
                };
                
                try {
                  const response = await axios.request(options);
                  console.log(response.data);
                } catch (error) {
                  console.error(error);
                }
                
                thay have Required Parameters
                query : eg. phone -//Search query. Supports both free-form text queries or a product asin.
                
                thay also have Optional Parameters
                page : eg. 1 
                NUMBER      OPTIONAL
                
                Results page to return.
                Default: 1
                country
                STRING
                
                OPTIONAL
                Sets the Amazon domain, marketplace country, language and currency.
                Default: IN
                Allowed values: US, AU, BR, CA, CN, FR, DE, IN, IT, MX, NL, SG, ES, TR, AE, GB, JP, SA, PL, SE, BE, EG
                sort_by
                ENUM
                
                OPTIONAL
                Return the results in a specific sort order.
                Default: RELEVANCE
                Allowed values: RELEVANCE, LOWEST_PRICE, HIGHEST_PRICE, REVIEWS, NEWEST, BEST_SELLERS
                category_id
                STRING
                
                OPTIONAL
                Find products in a specific category / department. Use the Product Category List endpoint to get a list of valid categories and their ids for the country specified in the request.
                Default: aps (All Departments)
                min_price
                NUMBER
                
                
                OPTIONAL
                Only return product offers with price greater than a certain value. Specified in the currency of the selected country. For example, in case country=US, a value of 105.34 means $105.34.
                max_price
                NUMBER
                
                
                OPTIONAL
                Only return product offers with price lower than a certain value. Specified in the currency of the selected country. For example, in case country=US, a value of 105.34 means $105.34.
                brand
                STRING
                
                OPTIONAL
                Find products with a specific brand. Multiple brands can be specified as a comma (,) separated list. The brand values can be seen from Amazon's search left filters panel, as seen here.
                e.g. SAMSUNG
                 e.g. Google,Apple
                product_condition
                ENUM
                
                OPTIONAL
                Return products in a specific condition.
                Allowed values: NEW, USED, RENEWED, COLLECTIBLE
                
                thay have sum perametrce  price mainly in ruppies 
                
                then over user ask to ${form.prompt}
                

                Give me  only params variables 
             in proper params structure 
            {
              query: ' ',
              page: ' ',
              country: ' ',
              category_id: ' '
            }

            like that give in object structure dont write in side double quotes
                `,
              },
            ],
          },
        ],
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const { text: Output } = response.data.candidates[0].content.parts[0];

      console.log(Output);

      console.log(response);

      setMyparam(Output);

      fetchdata(Output);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getSingleProduct=(data)=>{
    console.log(data);
    // const dataObject = JSON.parse(data);
    // console.log(dataObject);
    console.log(data['product_title']);
    if (userFinalRes) {
      document.getElementById(
        "userFinalRes"
      ).innerHTML = `<div className="container mb-5">
        <div className="row">
          <div className="col-10   ">
            <div className="card mb-3  " style={{maxWidth: "540px;"}}>
             <div className="p-5"> ${data}</div> 
            </div>
          </div>
        </div>
      </div>`;
    }
  }
  useEffect(() => {
    // Update the DOM only if userFinalRes is not null
   
  }, [userFinalRes]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <div className="main  ">
      <div className="nav">
        <a href="">
          <img src={assets.logo} alt="" className="img-fluid" width={100} />
        </a>
        <img src={assets.user_icon} className="userimg" alt="" />
      </div>
      <div className="main container">
        <div className="greet">
          <p>
            <span>Welcome, To E-comm chatbot</span>
          </p>
          <p>How can I help you ?</p>
        </div>
        <div className="cards d-flex gap-5 row ">
          <div className="card1 col-md-2 col-10 ">
            <p>
              “Amazing things will happen when you listen to the consumer.” –
              ...
            </p>
            {/* <img src={assets.compass_icon} alt="" /> */}
            <CiShop size={"2em"} />
          </div>
          <div className="card1 col-md-2 col-10">
            <p>Check this because you added something new in future.</p>
            {/* <img src={assets.bulb_icon} alt=""  /> */}
            <CiShoppingBasket size={"2em"} />
          </div>
          <div className="card1 col-md-2 col-10">
            <p>brainstrom team bonding ativities for over work retreat </p>
            {/* <img src={assets.message_icon} alt="" /> */}
            <CiShoppingCart size={"2em"} />
          </div>
          <div className="card1 col-md-2 col-10">
            <p>flash Sale! Get 48% off EVERYTHING for the next 2 Days with code FLASH 89ef4.</p>
            {/* <img src={assets.code_icon} alt="" /> */}
            <CiShoppingTag size={"2em"} />
          </div>
        </div>

        <div id="userFinalRes">
    
        </div>
        <form onSubmit={handleSubmit}>
          <div className="main-bottom">
            <div className="search-box">
              <input
                type="text"
                id=""
                placeholder="Enter a prompt here"
                name="prompt"
                value={form.prompt}
                onChange={onChange}
                required
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <button onClick={micClick} className="btn">
                  <img src={assets.mic_icon} alt="" />
                </button>
                <button type="submit" className="btn ">
                  {" "}
                  <img src={assets.send_icon} alt="" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Main;
