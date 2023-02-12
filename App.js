import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// display splash screen for two seconds
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

// get image for home screen
const bruschetta = require('./images/bruschetta.png');

// this allows the keyboard to be dismissed when there is a press event outside the keyboard.
const HideKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
  );

// create homescreen
function HomeScreen({ navigation }) {
	let numServInput = 1; // assigning this a value of 1 so if the button is pressed with no input, a recipe is displayed for one serving

	return(
		<HideKeyboard>
			<View style={styles.homeContainer}> 
				<Text style={styles.title}>Bruschetta Recipe</Text>

				<Image source={bruschetta} style={styles.image}/>

				<TextInput
					style={styles.placeholder} 
					placeholder="Enter the Number of Servings"
					keyboardType='numeric'
					onChangeText={text => numServInput = text} // when the number is changed, assign number to variable for navigation parameter on line 41
				/>
				<Pressable
					style={styles.button} 
					onPress={() => {
						navigation.navigate('Recipe', {numberOfServings: numServInput}); // go to Recipe screen when this button is pressed. Passing the numServInput variable as a parameter here
					}}>

					<Text style={styles.buttonText}>View Recipe</Text>
				</Pressable>
			</View>
		</HideKeyboard>
	);
}

// create screen that displays the recipe
function RecipeScreen( {route} ) {
	// get number of servings entered by user 
	const { numberOfServings } = route.params;

	// get quantity of each ingredient 
	const ptQty = 4 * numberOfServings
	const blQty = 6 * numberOfServings
	const gcQty = 3 * numberOfServings
	const ooQty = 3 * numberOfServings

	return(
		<View style={styles.recipeContainer}> 
			<Text style={styles.title}>Bruschetta</Text>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitle}>Ingredients</Text>
				<Text style={styles.subItem}>{ptQty.toFixed(0)} plum tomatoes</Text>
				<Text style={styles.subItem}>{blQty.toFixed(0)} basil leaves</Text>
				<Text style={styles.subItem}>{gcQty.toFixed(0)} garlic cloves, chopped</Text>
				<Text style={styles.subItem}>{ooQty.toFixed(0)} TB olive oil</Text>
			</View>
				
			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitle}>Directions</Text>
				<Text style={styles.subItem}>Combine the ingredients in a bowl. Add salt to taste. Place mixture on top of sliced French bread.</Text>
			</View>
		</View>
	);
}

// create Stack object for screen navigation
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator 
				screenOptions={{
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',																	
					}
				}}
				initialRouteName="Healthy Recipes"> 
				
				<Stack.Screen name="Healthy Recipes" component={HomeScreen} />
				<Stack.Screen name="Recipe" component={RecipeScreen} />
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	recipeContainer: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	title: {
		fontSize:  40,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	placeholder: {
		fontSize: 22,
		fontWeight: 'bold',
		padding: 30,
	},
	button: {
		height: 50,
		width: 150,
		borderWidth: 1, 
		padding: 12,
		backgroundColor: '#6e6c6b',	
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	  },
	subTitle: {
		fontSize:  35,
		fontWeight: 'bold',
		paddingTop: 20,
	},
	subTitleContainer: {
		paddingLeft: 15,
	},
	subItem: {
		fontSize:  25,
		fontWeight: 'bold',
		paddingLeft: 20,
	},
	image: {
		marginTop: 20,
	},
});
