import {Component} from "react";
import HelmesHook from "./helm-ui/HelmesHook";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <HelmesHook/>
            </div>
        );
    }
}

export default App;
