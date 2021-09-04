
import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Coin from './components/coinItems/Coin';


function App() {
  const [coins, setcoins] = useState([])
  const [search, setsearch] = useState("")
  const [dropDown, setdropDown] = useState("50")
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${dropDown}&page=1&sparkline=false`)
      .then((res)=>{
        setcoins(res.data)
        console.log(res.data)})
      .catch((err)=>console.error(err))
      console.log(dropDown)
  }, [dropDown])

  const handleChange=(e)=>{
    setsearch(e.target.value)
  }

  const handleDropDown=(limit)=>{
    setdropDown(limit)
    // document.getElementById("dd").inne
  }

  const filteredCoins = coins.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className="header">
      <h1 className="brand"><i className="fas fa-moon headerRender"></i>CoinMoon</h1>
      <form>
        <input className="inputField" type="text" onChange={handleChange} placeholder="Search Coin"/>
        <select name="dd" id="dd"  defaultValue={dropDown} onChange={(e)=>handleDropDown(e.target.value)}>
          <option value="10">Current Limit: 10 </option>
          <option value="50">Current Limit: 50 </option>
          <option value="100">Current Limit: 100 </option>
        </select>
      </form>
    </div>
    <div className="coinsContainer">
    {
      filteredCoins.map((coin)=>
      {
       return <Coin
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                marketcap={coin.market_cap}
                volume={coin.total_volume}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
      })
    }
    </div>
    </div>
  );
}

export default App;
