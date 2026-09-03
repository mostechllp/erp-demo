import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import type { Tone } from '../../types/erp';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  tone?: Extract<Tone, 'danger' | 'warning' | 'success' | 'brand'>;
  detail?: React.ReactNode;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  tone = 'danger',
  detail
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width="max-w-md"
      footer={
      <>
          <Button onClick={onClose}>Cancel</Button>
          <Button
          variant={tone === 'success' ? 'success' : tone === 'danger' ? 'danger' : 'primary'}
          onClick={() => {
            onConfirm();
            onClose();
          }}>
          
            {confirmLabel}
          </Button>
        </>
      }>
      
      <Alert tone={tone === 'brand' ? 'info' : tone} title={message}>
        {detail}
      </Alert>
    </Modal>);

}