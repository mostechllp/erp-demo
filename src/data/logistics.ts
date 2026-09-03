import type { Shipment } from '../types/erp';

export const SHIPMENTS: Shipment[] = [
{ id: 'SHP-6607', order: 'SO-5042', customer: 'Hansa Terminals GmbH', warehouse: 'WH-01 Rotterdam Main', carrier: 'Batavia Logistics BV', shipped: '2026-08-27', eta: '2026-09-04', status: 'In Transit', tracking: 'BAT-4471-8820' },
{ id: 'SHP-6608', order: 'SO-5046', customer: 'Cape Fabrication', warehouse: 'WH-01 Rotterdam Main', carrier: 'Maersk Line', shipped: '2026-08-22', eta: '2026-09-14', status: 'Delivered', tracking: 'MSK-9920-1174' },
{ id: 'SHP-6609', order: 'SO-5045', customer: 'Vantage Cold Chain', warehouse: 'WH-05 Singapore', carrier: 'DHL Freight', shipped: '2026-08-30', eta: '2026-09-06', status: 'Out for Delivery', tracking: 'DHL-3312-4408' },
{ id: 'SHP-6610', order: 'SO-5041', customer: 'Nordwind Marine BV', warehouse: 'WH-01 Rotterdam Main', carrier: 'Batavia Logistics BV', shipped: '—', eta: '2026-09-18', status: 'Packed', tracking: '—' },
{ id: 'SHP-6611', order: 'SO-5044', customer: 'Baltic Rail Works', warehouse: 'WH-01 Rotterdam Main', carrier: 'DSV Road', shipped: '—', eta: '2026-09-22', status: 'Processing', tracking: '—' },
{ id: 'SHP-6612', order: 'SO-5049', customer: 'Sunda Agro Mills', warehouse: 'WH-05 Singapore', carrier: 'Maersk Line', shipped: '—', eta: '2026-10-11', status: 'Order Confirmed', tracking: '—' }];


export const TRACKING_STAGES = [
'Order Confirmed',
'Processing',
'Packed',
'Dispatched',
'In Transit',
'Out for Delivery',
'Delivered'];


export const DISPATCH_BOARD = [
{ id: 'DSP-2201', shipment: 'SHP-6610', vehicle: 'Truck NL-42-BXK', driver: 'Rick van Dijk', dock: 'Dock 3', window: '18 Sep · 08:00–10:00', items: 21, weight: '4.2 t', status: 'Scheduled' },
{ id: 'DSP-2202', shipment: 'SHP-6607', vehicle: 'Truck NL-11-JJP', driver: 'Marta Nowicka', dock: 'Dock 1', window: '27 Aug · 06:00–08:00', items: 12, weight: '11.8 t', status: 'Dispatched' },
{ id: 'DSP-2203', shipment: 'SHP-6611', vehicle: 'Unassigned', driver: 'Unassigned', dock: 'Dock 2', window: '22 Sep · 13:00–15:00', items: 8, weight: '2.6 t', status: 'Unassigned' },
{ id: 'DSP-2204', shipment: 'SHP-6609', vehicle: 'Van SG-8842-K', driver: 'Adi Kurniawan', dock: 'SG Bay 4', window: '06 Sep · 09:00–11:00', items: 34, weight: '1.4 t', status: 'Out for Delivery' }];