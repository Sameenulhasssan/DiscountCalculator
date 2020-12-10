import React, { useState } from "react";
import { StyleSheet, View,Text,TouchableOpacity, Button, FlatList, TextInput,Modal } from "react-native";


export default function App() {
  const [calculations, setcalculations] = useState([]);
  const [modalShow,setmodalShow]=useState(false);
  const [originalPrice, setoriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [answer,setAnswer]=useState("");
  const [tempData,setTempData]=useState("")
  const [showNotification,setShowNotification]=useState(false);

  const priceHandler = (enteredText) => {
    if (parseFloat(enteredText) >= 0 || parseFloat(enteredText) <= 9) {
      setoriginalPrice(enteredText);
    }
  };

  const discountHandler = (enteredText) => {
    if (parseFloat(enteredText) > 0 || parseFloat(enteredText) <= 9) {
      if(discount.length <2){
        setDiscount(enteredText);
      }
    }
  };

  const performCalulation = () => {
    if(originalPrice !== '' && discount !== ''){
      let price = parseFloat(originalPrice);
      let reminder = price / 100;
      let final = (reminder * parseInt(discount, 10)).toFixed(2);
      let show = `${originalPrice} - ${discount}% = ${final}`;
      setTempData(show);
      setAnswer(`You Saved ${final}`);
    }
  };

  const addCalculations = (goalTitle) => {
    setcalculations((calculations) => [
      ...calculations,
      { id: Math.random().toString(), value: goalTitle },
    ]);
  };

  const addToList=()=>{
    if(answer !== ""){
      addCalculations(tempData);
      setShowNotification(true);
      setTimeout(()=>setShowNotification(false), 300);
      setoriginalPrice('');
      setDiscount('');
      setAnswer('');
    }
  }
  const removeCalculations=(itemID)=>{
    setcalculations(currentItems=>{
      return currentItems.filter((item) => item.id !== itemID);
    })
  }

  const clear =()=>{
    setoriginalPrice('');
    setDiscount('');
    setAnswer('');
    setTempData('');
  }
  const closeModal=()=>{
    setmodalShow(false);
  }
  const openModal = () => {
    setmodalShow(true);
  };
  return (
    <View style={styles.inputContainer}>
      {showNotification ? <Text style={styles.notification}>Data Saved</Text> : <Text></Text>}
      <TextInput
        placeholder="Original Price"
        style={styles.input}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={priceHandler}
        onEndEditing={performCalulation}
        value={originalPrice}
      />
      <TextInput
        placeholder="Total Discount"
        style={styles.input}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={discountHandler}
        onEndEditing={performCalulation}
        value={discount}
      />
      <TextInput
        placeholder="Discounted Value"
        style={styles.input2}
        editable={false}
        value={answer}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Clear" color="red" onPress={clear} />
        </View>
        <View style={styles.button}>
          <Button title="Save"  color="red" onPress={addToList} />
        </View>
      </View>
      <View style={styles.memory}>
        <View style={styles.buttonM}>
          <Button title="Show Memory" color="red" onPress={openModal} />
        </View>
      </View>
      <Modal visible={modalShow} animationType="slide">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Text style={styles.header}>Saved Calculations</Text>
          <TouchableOpacity style={styles.back} onPress={closeModal}>
            <Text style={{ textAlign: "center" }}>GO BACK</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={calculations}
          renderItem={(itemData) => (
            <CalList
              id={itemData.item.id}
              onDelete={removeCalculations}
              title={itemData.item.value}
            />
          )}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 50,
    padding: 25,
    marginBottom: 10,
  },
  input2: {
    width: "100%",
    fontSize: 30,
    borderRadius: 50,
    borderColor: "red",
    borderWidth: 8,
    color: "black",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: "49.8%",
    borderRadius: 10,
  },
  memory: {
    marginTop: 1,
    width: "100%",
  },
  header: {
    alignSelf: "center",
    width: "80%",
    fontSize: 20,
    textAlign: "center",
    borderColor: "red",
    fontWeight: "",
    borderWidth: 3,
    borderRadius: 50,
  },
  back: {
    padding: 6,
    width: 80,
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 50,
  },
  notification:{
    color:'red',
    fontSize:19
  }
});