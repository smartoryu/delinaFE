import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  const { size = "md", modal, title, toggle, actionFunc, className } = props;
  return (
    <div>
      <Modal size={size} isOpen={modal} toggle={toggle} className={className} centered>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={actionFunc}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
