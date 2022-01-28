
import React from 'react';
import { Button, View} from 'react-native';

export default function EditButton({onPressEdit, isDisabled, enableUpdateButton, onPressUpdate, onPressCancel}) {
         
      if(enableUpdateButton) {
        return ( 
          <View>
            <Button
              onPress= {onPressUpdate}
              title="Update"
              disabled={isDisabled}
            />
            <Button
              onPress= {onPressCancel}
              title="Cancel"
              disabled={isDisabled}
            />
          </View>
          );
      }
      else{
        return (
          <Button
            onPress= {onPressEdit}
            title="Edit"
            disabled={isDisabled}
          />);
      }
}