import React, { useEffect, useState } from 'react';
import { Counter } from './features/counter/Counter';
import { Typography, Layout, Menu, Button, Card, Row, Col } from 'antd';
import axios from 'axios';
import "antd/dist/antd.css"
import './App.sass';

const { Title, Text } = Typography;
const { Header, Content,  Footer } = Layout;


function App() {
  const [content, setContent] = useState([]);

  const fetchExchange = async () => {
	  const { data } = await axios.get(`https://satangcorp.com/api/v3/ticker/24hr`);
	  const filteredData = data.filter((item) => {
		  return item.symbol === "usdt_thb";
	  })
	  console.log(filteredData);
	  setContent(filteredData);
	}

	useEffect(() => {
		fetchExchange();
	}, []);


	
  return (
	  <div className='App'>
		<Layout className='layout'>
			<Header>
				<Menu theme='dark' mode="horizontal" defaultSelectedKeys={['2']}>
					<Menu.Item key="1">ตลาด</Menu.Item>
					<Menu.Item key="2">ซื้อขาย</Menu.Item>
					<Menu.Item key="3">บล็อก</Menu.Item>
					<Menu.Item key="4">เข้าสู่ระบบ</Menu.Item>
					<Menu.Item key="5">สมัครสมาชิก</Menu.Item>
					<Menu.Item key="6">ภาษาไทย/USD</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '28px 48px' }}>
				<Title>ราคาเหรียญคริปโทล่าสุด</Title>
				<Row justify='center' align='middle'>
					<Col span={4}>
						<Button type='primary' size='large' style={{ margin: "0px 0px 16px 0px" }} >BTC/THB</Button>
						<br />
						<Button type='primary' size='large' style={{ margin: "0px 0px 16px 0px" }} >BUSD/THB</Button>
						<br />
						<Button type='primary' size='large' >USDT/THB</Button>
						<br />
					</Col>
					<Col span={4}>
						<Card style={{ width: 300, margin: "16px 0px 0px 0px" }}>
						{content && content.map((ct) => 
								<div className='exchange-box'>
									<Text strong className='currency-title'>{ct.symbol}</Text>
									<br />
									<Text strong className='currency-price'>{ct.lastPrice}</Text>
									<br />
									<Text className='currency-volume' strong>Volume: {ct.volume}</Text>
								</div>													
							)}
						</Card>						
					</Col>
				</Row>
			</Content>
			<Footer style={{ textAlign:'center' }}>©2022 Created by YNT29</Footer>
		</Layout>
	  </div>
  );
}

export default App;


