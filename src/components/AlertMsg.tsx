import { Alert, AlertStatus, AlertTitle } from '@chakra-ui/react';

interface IAlertMsgProps {
  status: AlertStatus | null;
  icon: React.ReactNode;
  msg: string;
}

function AlertMsg({ status, icon, msg }: IAlertMsgProps) {
  return (
    <Alert status={status || 'info'}>
      {icon}
      <AlertTitle ml={10}>{msg}</AlertTitle>
    </Alert>
  );
}

export default AlertMsg;
