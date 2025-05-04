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
  Text,
  Link,
  Heading,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
 
  const [name, setName] = useState('');

  const handleClick = () => setShow(!show);

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
                  bgGradient="linear(to-r, cyan.600, blue.500)"
                  _hover={{ bgGradient: 'linear(to-r, cyan.700, blue.600)' }}
                >
                  Login
                </Button>

                
              </VStack>
            </TabPanel>

            {/* SIGNUP PANEL */}
            <TabPanel>
  <VStack spacing={4}>
    <FormControl id="name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder="Enter your name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </FormControl>

    <FormControl id="email-signup" isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>

    <FormControl id="password-signup" isRequired>
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

    {/* 📷 File upload input */}
    <FormControl id="profile-pic">
      <Button
        width="100%"
        color="white"
        bgGradient="linear(to-r, cyan.600, blue.500)"
        _hover={{ bgGradient: 'linear(to-r, cyan.700, blue.600)' }}
      >
        Signup
      </Button>
    </FormControl>
  </VStack>
</TabPanel>


          </TabPanels>
        </Tabs>
      </Container>
    </Flex>
  );
};

export default Login;
