import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import SignUp from './SignUp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Please fill in both fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setEmail('');
    setPassword('');

    try {
      setLoading(true);

      const { data } = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });

      toast({
        title: 'Login Successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Optionally, store the user token or info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Redirect or update state based on successful login
    } catch (error) {
      // Check if error response exists
      const errorMessage = error.response?.data?.message || error.message;

      let toastTitle = 'Login Failed!';
      let toastDescription = 'An error occurred. Please try again.';

      // Check for specific backend error messages
      if (errorMessage.includes('Invalid username')) {
        toastTitle = 'Invalid Username';
        toastDescription = 'The username you entered does not exist.';
      } else if (errorMessage.includes('Invalid password')) {
        toastTitle = 'Invalid Password';
        toastDescription = 'The password you entered is incorrect.';
      }

      toast({
        title: toastTitle,
        description: toastDescription,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex w="100%" minH="100vh" bg="cyan.900" align="center" justify="center">
      <Container maxW="sm" bg="white" borderRadius="lg" boxShadow="lg" p={6}>
        <Box textAlign="center" mb={4}>
          <Heading size="lg" color="cyan.900">Ping – Stay in touch</Heading>
        </Box>

        <Tabs variant="soft-rounded" colorScheme="cyan" isFitted>
          <TabList mb={4}>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>

          <TabPanels>
            {/* LOGIN PANEL */}
            <TabPanel>
              <VStack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  width="100%"
                  color="white"
                  isLoading={loading}
                  onClick={handleLogin}
                  bgGradient="linear(to-r, cyan.600, blue.500)"
                  _hover={{ bgGradient: 'linear(to-r, cyan.700, blue.600)' }}
                >
                  Login
                </Button>
              </VStack>
            </TabPanel>

            {/* SIGNUP PANEL */}
            <SignUp />
          </TabPanels>
        </Tabs>
      </Container>
    </Flex>
  );
};

export default Login;
