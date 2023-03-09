import { useState } from 'react'
import {
    Container,
    Form,
    Dropdown,
    DropdownContext,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Label
} from 'reactstrap'

function CountryStateCity () {
    const data = {
        countries: [
        {
            name: 'Malaysia',
            states: [
                {
                    name: 'Pulau Pinang',
                    cities: [
                        'Georgetown', 'Tanjong Tokong', 'Tanjong Bungah', 'Simpang Ampat', 'Bukit Mertajam', 'Butterworth'
                    ]
                },
                {
                    name: 'Wilayah Persekutuan',
                    cities: [
                        'Kuala Lumpur', 'Putrajaya', 'Labuan'
                    ]
                }
            ]
        },
        {
            name: 'Singapore',
            states: [
                {
                    name: 'Singapore',
                    cities: [
                        'Singapore'
                    ]
                }
            ]
        },
        ]
    }

    const [selectedCountry, setSelectedCountry] = useState()
    const [selectedState, setSelectedState] = useState()
    const [selectedCity, setSelectedCity] = useState()
    const [dropdown, setDropdown] = useState(false)
    const handleToggle = () => setDropdown(!dropdown)

    const availableState = data.countries.find(
        (c) => c.name === selectedCountry)
    const availableCities = availableState?.states?.find(
        (s) => s.name === selectedState)

    return (
        <>
            <Label for='countries'>Country</Label>
            <Dropdown fade='true' isOpen={dropdown} toggle={handleToggle}>
            <select
                placeholder='Country'
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
                <option>--Choose Country--</option>
                {
                    data.countries.map((value, key) => {
                        return (
                            <option value={ value.name } key={ key }>
                                { value.name }
                            </option>
                        )
                    })
                }
            </select>
            </Dropdown>
            <Label for='states'>State</Label>
            <Dropdown fade='true' isOpen={dropdown} toggle={handleToggle}>
                <select
                    placeholder='State'
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                >
                    <option>--Choose State--</option>
                    {
                        availableState?.states.map((e, key) => {
                            return (
                                <option value={e.name} key={key}>
                                    { e.name }
                                </option>
                            )
                        })
                    }
                </select>
            </Dropdown>
            <Label for='cities'>City</Label>
            <Dropdown fade='true' isOpen={dropdown} toggle={handleToggle}>
            <select
                placeholder='City'
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
            >
                <option>--Choose City--</option>
                {
                    availableCities?.cities.map((e, key) => {
                        return (
                            <option value={e.name} key={key}>
                                { e }
                            </option>
                        )
                    })
                }
            </select>
            </Dropdown>
        </>
    )
}

export default CountryStateCity