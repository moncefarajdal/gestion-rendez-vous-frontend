import React from 'react'
import { Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { APP_NAME } from 'configs/AppConfig';
import { Link } from 'react-router-dom';
import Flex from 'components/shared-components/Flex';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Verification = () => {
    const theme = useSelector(state => state.theme.currentTheme)
    let history = useHistory();
    function login() {
        history.push(`/auth/login`)
    }
    return (
        <div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
            <div className="container-fluid d-flex flex-column justify-content-between h-100 px-md-4 pb-md-4 pt-md-1">
                <div>
                    <img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png' : 'logo-white.png'}`} alt="" />
                </div>
                <div className="container">
                    <Row align="middle">
                        <Col xs={24} sm={24} md={8}>
                            <h1 className="font-weight-bold mb-4 display-4">Please verify your email</h1>
                            <p className="font-size-md mb-4">Kidnly verify your email address in order to complete your registration.</p>
                            <Link to='/app'>
                                <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => login()}>Go back</Button>
                            </Link>
                        </Col>
                        <Col xs={24} sm={24} md={{ span: 14, offset: 2 }}>
                            <img className="img-fluid mt-md-0 mt-4" src="/img/others/img-20.png" alt="" />
                        </Col>
                    </Row>
                </div>
                <Flex mobileFlex={false} justifyContent="between">
                    <span>Copyright <span className="font-weight-semibold">BMCA</span></span>
                    {/* <div>
						<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Term & Conditions</a>
						<span className="mx-2 text-muted"> | </span>
						<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a>
					</div> */}
                </Flex>
            </div>
        </div>
    )
}

export default Verification
