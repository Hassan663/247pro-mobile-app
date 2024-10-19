import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Button from './button.component';

const ProjectBottomSheet = ({ projects, isOpen, onClose, onSelectProject }) => {
  const modalizeRef = useRef(null);

  // Automatically open the modal if `isOpen` is true
  React.useEffect(() => {
    if (isOpen && modalizeRef.current) {
      modalizeRef.current.open();
    } else if (!isOpen && modalizeRef.current) {
      modalizeRef.current.close();
    }
  }, [isOpen]);

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Please select a nearby project</Text>
      {projects.map((project) => (
        <TouchableOpacity key={project.id} onPress={() => onSelectProject(project.id)} style={styles.projectContainer}>
          <View style={styles.projectDetails}>
            <Text style={styles.projectName}>{project.name} </Text>
            <Text style={styles.projectAddress}>{project.address}</Text>
            <Text style={styles.projectContact}>Contacts: {project.primaryContactName}</Text>
          </View>
        </TouchableOpacity>
      ))}
       <View style={{ paddingVertical: 20 }}>
    <Button
        title={'None of the above'}
        callBack={() => onSelectProject(null)}
        primary
    />
</View>
    </View>
  );

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={350}
      onClosed={onClose}
      adjustToContentHeight={true}
    >
      {renderContent()}
    </Modalize>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  title: {
    fontWeight: '400',
    fontSize: 20,
    marginVertical: 30,
    
  },
  projectContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  projectDetails: {
    flexDirection: 'column',
  },
  projectName: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 8,
  },
  projectAddress: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    marginBottom: 8,
  },
  projectContact: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProjectBottomSheet;