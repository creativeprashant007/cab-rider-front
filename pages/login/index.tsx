 
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, database } from "@/context/firebaseAuth/firebaseConfig"
import { useState, useEffect } from "react"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Image from 'next/image';
import { ref, set  } from "firebase/database";


const LoginCard = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .card {

      height: 75vh;
      width: 75vw;
      /* border: solid; */
      background-color: white;
      border-radius: 0.5rem;
      box-shadow:0 1rem 3rem rgba(0,0,0,.175)!important
    }
    .login-wrapper{
      display: flex;
      justify-content: center;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      width: 100%;
      height: 100%:
    }
    .image {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .image > img {
      border-radius: 0 0.5rem 0.5rem 0;
    }
    input {
      width: 20rem;
    }
    .heading {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
    }
`



function Login(){
  const [form] = Form.useForm()
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const router = useRouter()
  const onFinish = (values: any) => {
    try {
      const data =  signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      if (!data  || !auth.currentUser) {
        console.log("am i here")
        return
      }
      router.push("/")
      set(ref(database, `admins/${auth.currentUser.uid}`) , {
        "email": values.email,
        "is_logged_in": true,
      })
      
    } catch (error) {
      alert("Invalid Credentials login failed")
      console.log(error)
    }
  };
  
    
  return (
    <LoginCard>
      <div className="card login-wrapper">
        <div className="form">
          <h1 className="heading">Sign In</h1>
          <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email here!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#F04242", borderColor: "yellow" }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          </Form>
        </div>
        <div className="image">
          <Image src="/splash_image.jpg" alt="My Image" fill />
        </div>
      </div>
    </LoginCard>
  )
}



export default Login;