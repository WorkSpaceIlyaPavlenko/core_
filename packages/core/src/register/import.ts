import './button_store/button_register';
import './container_store/container_register';
import './container_store/container_childs_register';
import './text_store/text_register';

export * from '@/core/register/button_store/type'
export * from '@/core/register/text_store/type'
export * from '@/core/register/container_store/type'

// named exports
export { $buttons } from './button_store/button_register';
export { $containers } from './container_store/container_register';
export { $container_children } from './container_store/container_childs_register';
export { $texts } from './text_store/text_register';