import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  TabPanel,
  VStack,
  Image,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [pic, setPic] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPic(file);
    }
  };

  const handleRemovePic = () => {
    setPic(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadToCloudinary = async (file) => {
    const CLOUD_NAME = 'drs18hjpa';
    const UPLOAD_PRESET = 'ping_preset';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      toast({
        title: 'Please fill all required fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      let uploadedPicUrl = '';

      if (pic) {
        uploadedPicUrl = await uploadToCloudinary(pic);
      }

      const { data } = await axios.post('http://localhost:3000/api/user/register', {
        name,
        email,
        password,
        pic: uploadedPicUrl,
      });

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

      // Clear form after success
      setName('');
      setEmail('');
      setPassword('');
      setPic(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
              placeholder="Create your password"
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

        <FormControl id="profile-pic">
          <FormLabel>Upload Profile Picture</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {pic && (
            <Box position="relative" w="100px" h="100px" mt={2}>
              <Image
                src={URL.createObjectURL(pic)}
                alt="Profile preview"
                boxSize="100px"
                borderRadius="full"
                objectFit="cover"
              />
              <IconButton
                icon={<CloseIcon />}
                size="xs"
                position="absolute"
                top="-2"
                right="-2"
                colorScheme="red"
                borderRadius="full"
                onClick={handleRemovePic}
                aria-label="Remove image"
              />
            </Box>
          )}
        </FormControl>

        <Button
          width="100%"
          color="white"
          isLoading={loading}
          onClick={handleSubmit}
          bgGradient="linear(to-r, cyan.600, blue.500)"
          _hover={{ bgGradient: 'linear(to-r, cyan.700, blue.600)' }}
        >
          Signup
        </Button>
      </VStack>
    </TabPanel>
  );
};

export default SignUp;
