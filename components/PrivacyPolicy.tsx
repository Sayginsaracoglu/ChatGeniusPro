import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity,ScrollView} from "react-native";

interface PrivacyPolicyModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isVisible, onClose }) => {
  
    return (
    
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <ScrollView style={styles.scrollView}>    
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>
              We are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy
              outlines how we collect, use, and safeguard your information when
              you use our chatbot AI application.
            </Text>
          </View>
          <Text style={styles.modalTitle}>Information We Collect</Text>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>
              When you create a user account, we collect your email address and
              password. We do not collect any other personal information during
              the sign-up process.
            </Text>
            <Text style={styles.modalText}>
              When you use our chatbot AI application, we may collect certain
              technical information, such as your device type, operating system,
              and IP address. We may also collect information about your
              interactions with the chatbot, such as the date and time of your
              conversations.
            </Text>
            <Text style={styles.modalText}>
              If you choose to save your chat history with the chatbot, we will
              store this information in our database for future use. You may
              delete your chat history at any time.
            </Text>
          </View>
          <Text style={styles.modalTitle}>Use of Information</Text>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>
              We use the information we collect to operate, maintain, and
              improve our chatbot AI application, as well as to personalize your
              experience. We may also use your information to communicate with
              you about important updates or changes to our service.
            </Text>
          </View>
          <Text style={styles.modalTitle}>Disclosure of Information</Text>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>
              We may disclose your information to third parties who perform
              services on our behalf, such as database management or technical
              support. We may also disclose your information if required to do
              so by law or in response to a court order, subpoena, or other
              legal process.
            </Text>
          </View>
          <Text style={styles.modalTitle}>Security</Text>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>
              We take reasonable measures to protect your information from loss,
              theft, and unauthorized access, disclosure, alteration, and
              destruction. However, no method of transmission over the internet
              or electronic storage is completely secure, so we cannot guarantee
              the absolute security of your information.
            </Text>
          </View>
          </ScrollView >
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.0)",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor: "#000",
        borderRadius: 30,
        padding: 20,
        height: '76%',
        width: "100%",
        borderColor : '#000',
        overflow: "scroll", // enable scrolling within the view
      },
      closeButton: {
        alignSelf: "flex-end",
        padding: 5,
      },
      closeButtonText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#666",
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#FFF'
      },
      modalTextContainer: {
        marginTop: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
        color: '#FFF'
      },
      scrollView: {
        paddingVertical:0,
        paddingHorizontal: 5,
      },
});

export default PrivacyPolicyModal;
