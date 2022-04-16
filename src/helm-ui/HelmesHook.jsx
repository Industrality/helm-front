import {useEffect, useState} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {fetchSectors, fetchUserData, postUser} from "../api";


function HelmesHook() {

    const [sectors, setSectors] = useState([])
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState("")
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [selectedSectors, setSelectedSectors] = useState([])

    useEffect(
        () => {
            fetchSectors().then(r => setSectors(r))
            const lastUser = sessionStorage.getItem("lastUser")
            if (lastUser !== null) {
                fetchUserData(lastUser).then(userData => {
                    console.log(userData)
                    setUser(userData.userName)
                    setAgreedToTerms(userData.agreedToTerms)
                    setSelectedSectors(userData.sectors)
                })
            }
        }, []
    )

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const userDTO = {
                userName: user,
                agreedToTerms: agreedToTerms,
                sectors: selectedSectors
            }
            postUser(userDTO).finally()
            sessionStorage.setItem("lastUser", user)
        }
        setValidated(true)
    }

    const handleSelectSectors = (values) => {
        let options = values.target.options
        let value = []
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        setSelectedSectors(value)
    }

    const nonBreakingSpace = "\u00A0"

    const getDescription = (sector) => {
        let depthString = ""
        for (let i = 0; i < sector.depth; i++) {
            depthString = depthString + nonBreakingSpace
        }
        return depthString + sector.description
    }

    return (
        <Card className="App" style={{width: "750px", margin: "10px"}}>
            <CardHeader>
                Helmes
            </CardHeader>
            <Card.Body>
                <Card.Title>Please enter your name and pick the Sectors you are currently involved in.</Card.Title>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <br/>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder={"Name"}
                            aria-label={"Name"}
                            required
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Col} controlId="sectors">
                        <Form.Label>Sectors</Form.Label>
                        <Form.Control
                            as={"select"}
                            multiple
                            required
                            value={selectedSectors}
                            style={{height: "200px"}}
                            onChange={handleSelectSectors}
                        >
                            {sectors && sectors.map(sector => (
                                <option key={`sector-` + sector.value} value={sector.value}>
                                    {getDescription(sector)}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">At least 1 sector required.</Form.Control.Feedback>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Check
                            type={'checkbox'}
                            id={`default-checkbox`}
                            label={`Agree to terms`}
                            feedback={"You must agree before submitting."}
                            feedbackType={"invalid"}
                            checked={agreedToTerms}
                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                            required
                        />
                    </Form.Group>
                    <br/>
                    <Button type="submit">Save</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
export default HelmesHook