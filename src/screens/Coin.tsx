import styled from "styled-components";
import {Helmet} from 'react-helmet';
import {Link, NavLink, Outlet, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinInfo, fetchCoinTickers} from "../Api";

interface ITag {
    coin_counter: number
    ico_counter: number
    id: string;
    name: string;
}

interface ILink {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: ITag[];
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: ILink[];
    links_extended: {};
    whitepaper: {};
    first_data_at: string;
    last_data_at: string;
}

interface IQuotes {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: string;
    percent_from_price_ath: number;
}
interface ITickersData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {USD: IQuotes};
}

function Coin() {
   const {coinId} = useParams()
   const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(['info', coinId], () => fetchCoinInfo(coinId ?? ''))
   const {isLoading: tickersLoading, data: tickersData} = useQuery<ITickersData>(['tickers', coinId], () => fetchCoinTickers(coinId ?? ''), {
       refetchInterval: 60000,
   })

    document.title = infoData?.name ?? 'Loading...';

    return (
        <Container>
            {/*<Helmet>*/}
            {/*    <title>{infoData?.name ?? 'Loading...'}</title>*/}
            {/*</Helmet>*/}
                <Header>
                    <BackBtn><Link to="/">⬅</Link></BackBtn>
                    <Title>{infoData?.name ?? 'Loading...'}</Title>
                </Header>
            {(infoLoading || tickersLoading)
                ? <Loading>"Loading..."</Loading>
                : <DetailContainer>
                    <Overview>
                        <OverviewItem>
                            <span className="label">RANK:</span>
                            <span className="value">{infoData?.rank ?? '-'}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span className="label">SYMBOL:</span>
                            <span className="value">{infoData?.symbol ?? '-'}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span className="label">PRICE:</span>
                            <span className="value">${(tickersData?.quotes.USD.price ?? 0).toLocaleString('us', {minimumFractionDigits: 4})}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span className="label">TOTAL SUPPLY</span>
                            <span className="value">{(tickersData?.total_supply ?? 0).toLocaleString()}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span className="label">MAX SUPPLY</span>
                            <span className="value">{(tickersData?.max_supply ?? 0).toLocaleString()}</span>
                        </OverviewItem>
                    </Overview>
                    <TabContainer>
                        <Tab to={`/${coinId}/chart`}>Chart</Tab>
                        <Tab to={`/${coinId}/price`}>Price</Tab>
                    </TabContainer>
                    <Outlet context={{infoData, tickersData}}/>
                </DetailContainer>
            }
        </Container>
    )
}

const Container = styled.div`
  max-width: 480px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Loading = styled.span`
  display: block;
  text-align: center;
`;

const Header = styled.header`
  height: 60px;
  margin-bottom: 20px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;  
`;

const Title = styled.h1`
  padding: 0 10px;
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  color: ${props => props.theme.textColor}
`;

const Overview = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: #191a1b;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OverviewItem = styled.div`
  flex: 0 0 33%;
  display: flex;
  flex-flow: column;
  .label {
    margin-bottom: 10px;
    text-align: center;
    font-size: 0.8rem;
  }
  .value {
    text-align: center;
    font-weight: bold;
  }
`;

const Description = styled.div`
  padding: 20px;
  line-height: 1.5;
  font-size: 0.9rem;
`;

const TabContainer = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;

`

const Tab = styled(NavLink)`
  padding: 12px 0;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: #191a1a;
  border-radius: 0;
  &:first-child {
    border-radius: 10px 0 0 10px;
    border-right: 1px solid #303641;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &.active {
    background: ${props => props.theme.accentColor}
  }
  a {
    display: block;
  }
`

const BackBtn = styled.span`
  position: absolute;
  top: 30px;
  left: 0;
  font-size: 30px;
  transform: translateY(-50%);
  opacity: 0.4;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`

export default Coin;