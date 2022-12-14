import {useQuery} from "react-query";
import {fetchCoins} from "../Api"
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet";

interface ICoin {
    id: string;
    is_active:boolean;
    is_new:boolean;
    name: string;
    rank:number;
    symbol: string;
    type:string;
}

function Coins() {
    document.title = "Coin";
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)

    return (
        <Container>
            {/*Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code*/}
            {/*<Helmet>*/}
            {/*    <title>Coin</title>*/}
            {/*</Helmet>*/}
            <Header>
                <Title>Coin</Title>
            </Header>
            {isLoading
                ? <Loading>"Loading..."</Loading>
                : <CoinList>
                    {data?.slice(0,100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link
                                to={`/${coin.id}/chart`}
                                state={{
                                    name: coin.name
                                }}
                            >
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin icon"/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            }
        </Container>
    )
}

const Container = styled.div`
  max-width: 480px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 60px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Loading = styled.span`
  display: block;
  text-align: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: #fff;
  color: ${props => props.theme.bgColor};
  &:hover {
    a {
      color: ${props => props.theme.accentColor}
    }
  }
  a {
    padding: 20px;
    transition: color .3s ease-in;
    display: flex;
    align-items: center;
  }
`;

const Title = styled.h1`
  padding: 0 10px;
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`

export default Coins