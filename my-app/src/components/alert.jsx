import React from 'react';
import { Alert, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, NativeBaseProvider } from 'native-base';

export default function AlertSuccesAccount({ status }) {
  const mensagens = {
    success:'Conta criada com sucesso!',
    error:'Erro ao criar conta',
    info:'Conta já cadastrada no sistema'
  }
  let mensagemStatus

  if(status === 'success'){
    mensagemStatus = mensagens.success
  }
  if(status === 'error'){
    mensagemStatus = mensagens.error
  }
  if(status === 'info'){
    mensagemStatus = mensagens.info
  }

  return (
    <Box mt="100">
      <Alert maxW="400" status={status} colorScheme={status}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                {mensagemStatus}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600',
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    </Box>
  );
}
