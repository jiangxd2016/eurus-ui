// import { createApp } from 'vue';

// /**
//  * Message instance operation
//  * @param {*} cfg configuration
//  */
// const createInstance = (cfg) => {
//   const config = cfg || {};

//   // create a container and set its class
//   const messageNode = document.createElement('div');
//   const attr = document.createAttribute('class');
//   attr.value = 'e-message';
//   messageNode.setAttributeNode(attr);

//   // set a counter, when the next message happens, it will have a distance from the previous one
//   const height = 70; // height, play around
//   const messageList = document.querySelectorAll('.e-message');
//   messageNode.style.top = `${messageList.length * height}px`;

//   // reset each message's distance (Top value) to the top
//   const resetMsgTop = () => {
//     for (const [i, element] of messageList.entries()) {
//       element.style.top = `${i * height}px`;
//     }
//   };

//   const handleRemove = () => {
//     app.unmount(messageNode);
//     messageNode.remove();
//     resetMsgTop();
//   };

//   // create a Vue instance and append to Body
//   const app = createApp(eMessage, {
//     config,

//     // remove the element, close message and unmount and remove from DOM
//     remove() {
//       handleRemove();
//     }
//   });

//   // mount the instance and append to end of Body
//   app.vm = app.mount(messageNode);
//   document.body.append(messageNode);

//   app.close = () => {
//     handleRemove();
//   };
//   return app;
// };

// export default createInstance;
