import { AlertStatus } from '@chakra-ui/react';

export interface IAlertState {
  alert: boolean;
  status: AlertStatus | null;
  message: string;
  icon: React.ReactNode | null;
}

export interface IAlertPayload {
  status: AlertStatus;
  message: string;
  icon: React.ReactNode;
}
