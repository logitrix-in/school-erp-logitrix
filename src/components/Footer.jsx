import { Icon } from '@iconify/react'
import { Box, Typography } from '@mui/material'
import React from 'react'
import useAuth from '../hooks/useAuth';
import dayjs from 'dayjs';

const Footer = () => {

  const user = useAuth();
  return (
    <Box
            py={2}
            pl={1}
            display={"flex"}
            gap={4}
            color={"#00a76f67"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              color={"gray"}
              variant="caption"
              fontWeight={600}
              mr={"auto"}
            >
              Last Logged In on {dayjs(new Date(user?.user?.last_login)).format('DD MMM YYYY, hh:mm a')}
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={0.4}>
              <Icon icon="fa:group" fontSize={"1.2rem"} />
              <Typography fontSize={10} lineHeight={"1ch"}>
                1000
              </Typography>
            </Box>
            <Icon icon="mingcute:signal-fill" fontSize={"1.4rem"} />
          </Box>
  )
}

export default Footer