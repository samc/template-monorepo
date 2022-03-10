// Code generated by protoc-gen-validate. DO NOT EDIT.
// source: taygo/db/attributes.proto

package db

import (
	"bytes"
	"errors"
	"fmt"
	"net"
	"net/mail"
	"net/url"
	"regexp"
	"sort"
	"strings"
	"time"
	"unicode/utf8"

	"google.golang.org/protobuf/types/known/anypb"
)

// ensure the imports are used
var (
	_ = bytes.MinRead
	_ = errors.New("")
	_ = fmt.Print
	_ = utf8.UTFMax
	_ = (*regexp.Regexp)(nil)
	_ = (*strings.Reader)(nil)
	_ = net.IPv4len
	_ = time.Duration(0)
	_ = (*url.URL)(nil)
	_ = (*mail.Address)(nil)
	_ = anypb.Any{}
	_ = sort.Sort
)

// Validate checks the field values on Attributes with the rules defined in the
// proto definition for this message. If any rules are violated, the first
// error encountered is returned, or nil if there are no violations.
func (m *Attributes) Validate() error {
	return m.validate(false)
}

// ValidateAll checks the field values on Attributes with the rules defined in
// the proto definition for this message. If any rules are violated, the
// result is a list of violation errors wrapped in AttributesMultiError, or
// nil if none found.
func (m *Attributes) ValidateAll() error {
	return m.validate(true)
}

func (m *Attributes) validate(all bool) error {
	if m == nil {
		return nil
	}

	var errors []error

	// no validation rules for Optional

	// no validation rules for Unique

	// no validation rules for Id

	// no validation rules for UpdatedAt

	if all {
		switch v := interface{}(m.GetDefault()).(type) {
		case interface{ ValidateAll() error }:
			if err := v.ValidateAll(); err != nil {
				errors = append(errors, AttributesValidationError{
					field:  "Default",
					reason: "embedded message failed validation",
					cause:  err,
				})
			}
		case interface{ Validate() error }:
			if err := v.Validate(); err != nil {
				errors = append(errors, AttributesValidationError{
					field:  "Default",
					reason: "embedded message failed validation",
					cause:  err,
				})
			}
		}
	} else if v, ok := interface{}(m.GetDefault()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return AttributesValidationError{
				field:  "Default",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if all {
		switch v := interface{}(m.GetRelation()).(type) {
		case interface{ ValidateAll() error }:
			if err := v.ValidateAll(); err != nil {
				errors = append(errors, AttributesValidationError{
					field:  "Relation",
					reason: "embedded message failed validation",
					cause:  err,
				})
			}
		case interface{ Validate() error }:
			if err := v.Validate(); err != nil {
				errors = append(errors, AttributesValidationError{
					field:  "Relation",
					reason: "embedded message failed validation",
					cause:  err,
				})
			}
		}
	} else if v, ok := interface{}(m.GetRelation()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return AttributesValidationError{
				field:  "Relation",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if len(errors) > 0 {
		return AttributesMultiError(errors)
	}

	return nil
}

// AttributesMultiError is an error wrapping multiple validation errors
// returned by Attributes.ValidateAll() if the designated constraints aren't met.
type AttributesMultiError []error

// Error returns a concatenation of all the error messages it wraps.
func (m AttributesMultiError) Error() string {
	var msgs []string
	for _, err := range m {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

// AllErrors returns a list of validation violation errors.
func (m AttributesMultiError) AllErrors() []error { return m }

// AttributesValidationError is the validation error returned by
// Attributes.Validate if the designated constraints aren't met.
type AttributesValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e AttributesValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e AttributesValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e AttributesValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e AttributesValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e AttributesValidationError) ErrorName() string { return "AttributesValidationError" }

// Error satisfies the builtin error interface
func (e AttributesValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sAttributes.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = AttributesValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = AttributesValidationError{}

// Validate checks the field values on AttributesDefault with the rules defined
// in the proto definition for this message. If any rules are violated, the
// first error encountered is returned, or nil if there are no violations.
func (m *AttributesDefault) Validate() error {
	return m.validate(false)
}

// ValidateAll checks the field values on AttributesDefault with the rules
// defined in the proto definition for this message. If any rules are
// violated, the result is a list of violation errors wrapped in
// AttributesDefaultMultiError, or nil if none found.
func (m *AttributesDefault) ValidateAll() error {
	return m.validate(true)
}

func (m *AttributesDefault) validate(all bool) error {
	if m == nil {
		return nil
	}

	var errors []error

	if all {
		switch v := interface{}(m.GetValue()).(type) {
		case interface{ ValidateAll() error }:
			if err := v.ValidateAll(); err != nil {
				errors = append(errors, AttributesDefaultValidationError{
					field:  "Value",
					reason: "embedded message failed validation",
					cause:  err,
				})
			}
		case interface{ Validate() error }:
			if err := v.Validate(); err != nil {
				errors = append(errors, AttributesDefaultValidationError{
					field:  "Value",
					reason: "embedded message failed validation",
					cause:  err,
				})
			}
		}
	} else if v, ok := interface{}(m.GetValue()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return AttributesDefaultValidationError{
				field:  "Value",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	// no validation rules for Autoincrement

	// no validation rules for Dbgenerated

	// no validation rules for Cuid

	// no validation rules for Uuid

	// no validation rules for Now

	if len(errors) > 0 {
		return AttributesDefaultMultiError(errors)
	}

	return nil
}

// AttributesDefaultMultiError is an error wrapping multiple validation errors
// returned by AttributesDefault.ValidateAll() if the designated constraints
// aren't met.
type AttributesDefaultMultiError []error

// Error returns a concatenation of all the error messages it wraps.
func (m AttributesDefaultMultiError) Error() string {
	var msgs []string
	for _, err := range m {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

// AllErrors returns a list of validation violation errors.
func (m AttributesDefaultMultiError) AllErrors() []error { return m }

// AttributesDefaultValidationError is the validation error returned by
// AttributesDefault.Validate if the designated constraints aren't met.
type AttributesDefaultValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e AttributesDefaultValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e AttributesDefaultValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e AttributesDefaultValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e AttributesDefaultValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e AttributesDefaultValidationError) ErrorName() string {
	return "AttributesDefaultValidationError"
}

// Error satisfies the builtin error interface
func (e AttributesDefaultValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sAttributesDefault.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = AttributesDefaultValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = AttributesDefaultValidationError{}

// Validate checks the field values on AttributesRelation with the rules
// defined in the proto definition for this message. If any rules are
// violated, the first error encountered is returned, or nil if there are no violations.
func (m *AttributesRelation) Validate() error {
	return m.validate(false)
}

// ValidateAll checks the field values on AttributesRelation with the rules
// defined in the proto definition for this message. If any rules are
// violated, the result is a list of violation errors wrapped in
// AttributesRelationMultiError, or nil if none found.
func (m *AttributesRelation) ValidateAll() error {
	return m.validate(true)
}

func (m *AttributesRelation) validate(all bool) error {
	if m == nil {
		return nil
	}

	var errors []error

	// no validation rules for Name

	if len(errors) > 0 {
		return AttributesRelationMultiError(errors)
	}

	return nil
}

// AttributesRelationMultiError is an error wrapping multiple validation errors
// returned by AttributesRelation.ValidateAll() if the designated constraints
// aren't met.
type AttributesRelationMultiError []error

// Error returns a concatenation of all the error messages it wraps.
func (m AttributesRelationMultiError) Error() string {
	var msgs []string
	for _, err := range m {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

// AllErrors returns a list of validation violation errors.
func (m AttributesRelationMultiError) AllErrors() []error { return m }

// AttributesRelationValidationError is the validation error returned by
// AttributesRelation.Validate if the designated constraints aren't met.
type AttributesRelationValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e AttributesRelationValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e AttributesRelationValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e AttributesRelationValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e AttributesRelationValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e AttributesRelationValidationError) ErrorName() string {
	return "AttributesRelationValidationError"
}

// Error satisfies the builtin error interface
func (e AttributesRelationValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sAttributesRelation.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = AttributesRelationValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = AttributesRelationValidationError{}