import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter succursale name',
		}
	],
	adresse: [
		{
			required: true,
			message: 'Please enter succursale adresse',
		}
	],
	service: [
		{
			required: true,
			message: 'Please enter succursale service',
		}
	],
	societe: [
		{
			required: true,
			message: 'Please enter succursale service',
		}
	]
}







const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Basic Info">
				<Form.Item name="nom" label="Name" rules={rules.name}>
					<Input placeholder="Succursale Name" />
				</Form.Item>
				<Form.Item name="service" label="Service" rules={rules.name}>
					<Input placeholder="Succursale Service" />
				</Form.Item>
				<Form.Item name="adresse" label="Adress" rules={rules.name}>
					<Input placeholder="Succursale Adress" />
				</Form.Item>
				<Form.Item name="societe" label="Societe" rules={rules.name}>
					<Input placeholder="Succursale Adress" />
				</Form.Item>
				
			</Card>
			
		</Col>
		
	</Row>
)

export default GeneralField
